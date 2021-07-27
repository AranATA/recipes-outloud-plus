import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import Navbar from '../components/Navbar';
import NoteList from '../components/NoteList';
import NoteForm from '../components/NoteForm';
import { QUERY_SINGLE_RECIPE } from '../utils/queries';

import SpeakButton from '../components/SpeakButton';
import { recipeInformation } from '../utils/API';

const Recipe = () => {

  const [recipeData, setRecipeData] = useState({});
  console.log(recipeData)

  const { id: recipeId } = useParams();
  console.log(recipeId)

  // URL to original recipe page
  const linkBody = recipeData.title?.replace(/\s+/g, '-').toLowerCase();
  console.log(linkBody);
  const recipeURL = `https://spoonacular.com/${linkBody}-${recipeId}`

  const [isloading, setIsLoading] = useState(false)

  useEffect(() => {

    async function handleGetInstructions() {
      setIsLoading(true)
      try {
        const recipeResponse = await recipeInformation(recipeId);
        const result = await recipeResponse.json();

        let ingredientsSpoken = ''
        result.extendedIngredients.forEach((ingredient, index) => {
          ingredientsSpoken = ingredientsSpoken + ingredient.originalString + ", "
        });

        result.ingredientsSpoken = ingredientsSpoken
        console.log(result);
        setRecipeData(result);

      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    }
    handleGetInstructions();
  }, [recipeId])  

  const { loading, data } = useQuery(QUERY_SINGLE_RECIPE, {
  // pass URL parameter
  variables: { recipeId: recipeId },
  })
  const recipe = data?.recipe || {};
  if (loading) {
    return <div>Loading...</div>;
  }

  return (

    <div>
      <div className="w-full">
        <Navbar />
      </div>

      <div className="w-full bg-yellow-400 text-gray-800  p-5">        
        <a className="flex flex-col items-center pt-3 mx-2 justify-center rounded-lg" href={recipeURL} target="blank">
          <div className="bg-yellow-400 w-full flex justify-center">
            <h4 className=" py-4" >{recipeData?.title}</h4>
          </div>
        </a>
        {
          recipeData.summary && ( 
            <>
              <SpeakButton wordsToSpeak={recipeData?.summary} />
              <p dangerouslySetInnerHTML={{ __html: recipeData?.summary }}></p>
            </>
          )    
        }
      </div>

      <div>
        <NoteList userNotes={recipe.userNotes} />  
      </div>

      <div>
        <NoteForm recipeId={recipe._id} />
      </div>
    </div>
  );
}

export default Recipe;