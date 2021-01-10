import React, {createContext, useState, useEffect} from "react";
import {IdeaType} from "../customTypes/ideaType";
import {Tag} from "../customTypes/tags";
import {getIdeas} from "../services/database";

export const IdeaContext = createContext({});

//TODO: Pagination

const IdeaProvider = (props: any) => {
  const [ideas, setIdeas] = useState<IdeaType[]>();
  const [oldestComesLast, setOldestComesLast] = useState(true);
  const [filters, setFilters] = useState<Tag[]>();

  useEffect(() => {
    // console.log('useEffectCalled');
    
    const unsub = getIdeas(oldestComesLast, filters).onSnapshot(snap => {
      var ret: IdeaType[] = [];
      snap.forEach(idea => {
        ret.push(idea.data());
      });
      setIdeas(ret);
    });
    
    return () => {
      // console.log('unsub'); TODO: subs überprüfen
      unsub();
    }
  }, [oldestComesLast, filters]);

  // const fetchIdeasOnce = async () => {
  //   const data = await getIdeas(oldestComesLast, filters).get();
  //   const ideas = data.docs.map(doc => doc.data());
  //   setIdeas(ideas);
  // }

  return (
    <IdeaContext.Provider value={{
      ideas,
      oldestComesLast: [oldestComesLast, setOldestComesLast],
      filters: [filters, setFilters]
    }}>
      {props.children}
    </IdeaContext.Provider>
  );
}

export default IdeaProvider;