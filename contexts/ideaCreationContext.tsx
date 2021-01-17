import React, { createContext, useEffect, useState } from 'react';
import { IdeaFactory } from '../customTypes/ideaFactory';
import { createIdea } from '../services/database';

export const ideaCreationContext = createContext({});

const IdeaCreationProvider = (props: any) => {
  const [newIdea, setNewIdea] = useState(new IdeaFactory);
  const [completed, setCompleted] = useState(false);
  const [discard, setDiscard] = useState(false);
  
  useEffect(() => {
    newIdea.with()
    .creationTimestampDefault()
    .imageURLsEmpty()
    .tags([])
  }, [newIdea])

  useEffect(() => {
    if (completed){
      try{
        console.log('called: ', newIdea);
        
        createIdea(newIdea.buildWithChecks());
        setNewIdea(new IdeaFactory);
      }catch(e){
        alert(e);
        return;
      }
    }
    if(discard){
      setNewIdea(new IdeaFactory);
      setDiscard(false);
    }
  }, [completed, discard])

  
  return (
    <ideaCreationContext.Provider value={{
      newIdea,
      setCompleted,
      setDiscard
    }}>
      {props.children}
    </ideaCreationContext.Provider>
  )
}


export default IdeaCreationProvider;