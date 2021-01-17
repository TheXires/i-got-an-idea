import firebase from "firebase/app";
import React, {createContext, useState, useEffect} from "react";
import {useAuthState} from "react-firebase-hooks/auth";
import {IdeaType} from "../customTypes/ideaType";
import {Tag} from "../customTypes/tags";
import {getIdeas} from "../services/database";

export const IdeaContext = createContext({});

//TODO: Pagination test

const IdeaProvider = (props: any) => {
  const [user, loading, error] = useAuthState(firebase.auth());
  const [ideas, setIdeas] = useState<IdeaType[]>();
  const [oldestComesLast, setOldestComesLast] = useState(true);
  const [filters, setFilters] = useState<Tag[]>();
  const [lastQueriedSnapshot, setLastQueriedSnapshot] = useState<firebase.firestore.QueryDocumentSnapshot<IdeaType> | undefined>(undefined);
  const [limitReached, setLimitReached] = useState(false);



  // Initial load
  useEffect(() => {
    if (user == undefined || user == null || loading) {
      return;
    }


    setLastQueriedSnapshot(undefined);

    getIdeas(oldestComesLast, filters, undefined).get().then(snap => {
      var ret: IdeaType[] = [];
      snap.forEach(idea => {
        ret.push(idea.data());
        setLastQueriedSnapshot(idea);
      });
      if (ret != undefined && ret.length > 0) {
        setIdeas(ret);
      } else {
        setLimitReached(true);
      }
    });
  }, [oldestComesLast, filters, user, loading]);


  // pagination load
  const loadMoreEntries = () => {
    if (loading == false && user == null) {
      return;
    }

    getIdeas(oldestComesLast, filters, lastQueriedSnapshot).get().then(snap => {
      var ret: IdeaType[] = [];
      snap.forEach(idea => {
        ret.push(idea.data());
        setLastQueriedSnapshot(idea);
      });
      if (ret != undefined && ret.length > 0 && ideas != undefined) {
        setIdeas(ideas.concat(ret));
      } else {
        setLimitReached(true);
      }
    });
  }


  // const fetchIdeasOnce = async () => {
  //   const data = await getIdeas(oldestComesLast, filters).get();
  //   const ideas = data.docs.map(doc => doc.data());
  //   setIdeas(ideas);
  // }

  return (
    <IdeaContext.Provider value={{
      ideas,
      oldestComesLast: [oldestComesLast, setOldestComesLast],
      filters: [filters, setFilters],
      loadMoreEntries,
      limitReached
    }}>
      {props.children}
    </IdeaContext.Provider>
  );
}

export default IdeaProvider;