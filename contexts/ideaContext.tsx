import firebase from "firebase/app";
import React, {createContext, useState, useEffect} from "react";
import {useAuthState} from "react-firebase-hooks/auth";
import {IdeaType} from "../customTypes/ideaType";
import {Tag} from "../customTypes/tags";
import {getIdeas} from "../services/database";

export const IdeaContext = createContext({});

/**
 * Context for caching ideas which were fetched from the DB
 */
const IdeaProvider = (props: any) => {
  const [user, loading, error] = useAuthState(firebase.auth());
  const [ideas, setIdeas] = useState<IdeaType[]>();//ideas in an array
  const [oldestComesLast, setOldestComesLast] = useState(true);//sorting direction
  const [filters, setFilters] = useState<Tag[]>();//filters to apply
  const [lastQueriedSnapshot, setLastQueriedSnapshot] = useState<firebase.firestore.QueryDocumentSnapshot<IdeaType> | undefined>(undefined);//for pagination
  const [limitReached, setLimitReached] = useState(false);//tells if the last item available was fetched from the DB
  const [contextLoading, setContextLoading] = useState(true)
  const [contextLoadingMoreEntries, setContextLoadingMoreEntries] = useState(false)


  useEffect(() => {
    if (user == undefined || user == null || loading) {
      return;
    }
    setContextLoading(true);

    setLastQueriedSnapshot(undefined);

    getIdeas(oldestComesLast, filters, undefined).get().then(snap => {
      var ret: IdeaType[] = [];
      setLimitReached(false);
      snap.forEach(idea => {
        ret.push(idea.data());
        setLastQueriedSnapshot(idea);
      });
      if (ret != undefined) {
        setIdeas(ret);
      } else {
        setLimitReached(true);
      }
      setContextLoading(false);
    });
  }, [oldestComesLast, filters, user, loading]);


  /**
   * Load more entries with pagination
   */
  const loadMoreEntries = () => {
    if (loading == false && user == null && !limitReached) {
      return;
    }
    setContextLoadingMoreEntries(true);

    getIdeas(oldestComesLast, filters, lastQueriedSnapshot).get().then(snap => {
      var ret: IdeaType[] = [];
      setLimitReached(false);
      snap.forEach(idea => {
        ret.push(idea.data());
        setLastQueriedSnapshot(idea);
      });
      if (ret != undefined && ideas != undefined) {
        setIdeas(ideas.concat(ret));
      } else {
        setLimitReached(true);
      }
      setContextLoadingMoreEntries(false);
    });
  }

  return (
    <IdeaContext.Provider value={{
      ideas,
      oldestComesLast: [oldestComesLast, setOldestComesLast],
      filters: [filters, setFilters],
      loadMoreEntries,
      limitReached,
      contextLoading,
      contextLoadingMoreEntries
    }}>
      {props.children}
    </IdeaContext.Provider>
  );
}

export default IdeaProvider;