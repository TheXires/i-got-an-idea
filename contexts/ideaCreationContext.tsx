import React, { createContext, useEffect, useState } from 'react';
import { IdeaFactory } from '../customTypes/ideaFactory';
import { createIdea } from '../services/database';

export const ideaCreationContext = createContext({});

const IdeaCreationProvider = (props: any) => {
  const [newIdea, setNewIdea] = useState(new IdeaFactory);
  const [completed, setCompleted] = useState(false);
  
  newIdea.with()
    .creationTimestampDefault()
    .imageURLsEmpty()
    .tags([])

  useEffect(() => {
    if (completed){
      try{
        createIdea(newIdea.buildWithChecks());
        setNewIdea(new IdeaFactory);
      }catch(e){
        alert(e);
        return;
      }
    }
  }, [completed])

  
  return (
    <ideaCreationContext.Provider value={{
      newIdea,
      setCompleted
    }}>
      {props.children}
    </ideaCreationContext.Provider>
  )
}


export default IdeaCreationProvider;