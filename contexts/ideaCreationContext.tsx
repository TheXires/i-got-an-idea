import React, { createContext, useEffect, useState } from 'react';
import { IdeaFactory } from '../customTypes/ideaFactory';
import { createIdea } from '../services/database';

export const ideaCreationContext = createContext({});

/**
 * Context to store the different values which occur during the idea creation process
 * across different components
 */
const IdeaCreationProvider = (props: any) => {
  const [newIdea, setNewIdea] = useState(new IdeaFactory);
  const [completed, setCompleted] = useState(false);
  const [discard, setDiscard] = useState(false);
  const [finished, setFinished] = useState(false);
  
  useEffect(() => {
    newIdea.with()
    .creationTimestampDefault()
    .imageURLsEmpty()
    .tags([])
  }, [newIdea])

  useEffect(() => {
    if (completed){
      try{
        createIdea(newIdea.buildWithChecks());
        setNewIdea(new IdeaFactory);
        setFinished(true);
        setCompleted(false);
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
      setDiscard,
      finished,
      setFinished
    }}>
      {props.children}
    </ideaCreationContext.Provider>
  )
}


export default IdeaCreationProvider;