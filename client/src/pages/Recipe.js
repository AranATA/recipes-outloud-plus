import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import NoteList from '../components/NoteList';
import Navbar from '../components/Navbar';
import SpeakButton from '../components/SpeakButton';
import { recipeInformation } from '../utils/API';

const Recipe = () => {

  const { id: recipeId } = useParams();
  console.log(recipeId)
  const [recipeData, setRecipeData] = useState({});
  console.log(recipeData)
  const [isloading, setIsLoading] = useState(false)

  const linkBody = recipeData.title?.replace(/\s+/g, '-').toLowerCase();
  console.log(linkBody);
  const recipeURL = `https://spoonacular.com/${linkBody}-${recipeId}`

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

      <NoteList />  

    </div>
  );
}

export default Recipe;