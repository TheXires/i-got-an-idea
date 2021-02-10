import React, { createContext, useEffect, useState } from 'react';
import { IdeaFactory } from '../customTypes/ideaFactory';
import { createIdea } from '../services/database';

export const ideaCreationContext = createContext({});

var finished: boolean = false;

function setFinished(isFinished: boolean){
  finished = isFinished;
}

function getFinished(): boolean{
  return finished;
}

/**
 * Context to store the different values which occur during the idea creation process
 * across different components
 */
const IdeaCreationProvider = (props: any) => {
  const [newIdea, setNewIdea] = useState(new IdeaFactory);
  const [discard, setDiscard] = useState(false);
  
  useEffect(() => {
    newIdea.with()
    .description('')
    .imageURLsEmpty()
    .name('')
    .tags([])
  }, [newIdea])


  function completed() {
    try{
      newIdea.creationTimestampDefault().and().authorIDDefault()
      createIdea(newIdea.buildWithChecks());
      setNewIdea(new IdeaFactory);
      finished = true;
    }catch(e){
      alert(e);
      return;
    }
  }

  useEffect(() => {
    if(discard){
      setNewIdea(new IdeaFactory);
      setDiscard(false);
    }
  }, [discard])

  
  return (
    <ideaCreationContext.Provider value={{
      newIdea,
      completed,
      setDiscard,
      getFinished,
      setFinished
    }}>
      {props.children}
    </ideaCreationContext.Provider>
  )
}


export default IdeaCreationProvider;