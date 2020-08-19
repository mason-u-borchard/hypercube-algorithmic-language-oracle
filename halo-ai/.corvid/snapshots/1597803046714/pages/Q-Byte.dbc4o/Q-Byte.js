// For full API documentation, including code examples, visit https://wix.to/94BuAAs
import sampleData from 'wix-data';
import {getRandomBytes} from 'backend/getRandomBytes.jsw';
import wixData from 'wix-data';
// import bits from "wix-data";
import words from "wix-data";
import {fetch} from 'wix-fetch';

// In http-functions.js
// URL looks like:
// https://www.mysite.com/_functions/myFunction/findMe
// or:
// https://user.wixsite.com/mysite/_functions/myFunction/findMe

// export function button1_click(event, $w){
//       return getRandomByte(
//             $w("#button2").label = data.value[0].toString()
//             $w("#button3").label = data.value[1].toString()
//             $w("#button4").label = data.value[2].toString()
//             $w("#button5").label = data.value[3].toString()
//             $w("#button6").label = data.value[4].toString()
//             $w("#button7").label = data.value[5].toString()
//             $w("#button8").label = data.value[6].toString()
//             $w("#button9").label = data.value[7].toString()
//     )
// }

$w.onReady(function () {
  console.log('test passed');

  function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
  }


// function loadSampleData() {
//   wixData.query("SampleData")
//   .find()
//   .then ((results)=> {
//     console.log('results.items[0]', results.items[0])
//     // $w("#text11").data = results.items;
//     })
// .catch( (err) => {
//   let errorMsg = err;
// });
// }


 // This function changes 'UP_TO_TEN_' to a different random word every 1000ms
setInterval(function() {
var array = getRandomBytes().then((res) => {
        // console.log({ promiseIsResolved: res });
        // console.log('res', res);
        return res;
})
.then((byteArr) => {
  // console.log('arr', byteArr);
   let j = random(0, byteArr.length - 1);
  //  console.log('j', j);
      var currentByte = byteArr[j].split(',');
      // console.log('currentByte', currentByte);
      $w("#button2").label = currentByte[0];
      $w("#button3").label = currentByte[1];
      $w("#button4").label = currentByte[2];
      $w("#button5").label = currentByte[3];
      $w("#button6").label = currentByte[4];
      $w("#button7").label = currentByte[5];
      $w("#button8").label = currentByte[6];
      $w("#button9").label = currentByte[7];
})


/* this section is a hard-coded subsitute to create pseudo-pseudo random bytes
  every 1000ms instead of pulling data from .txt file from remote server. comment
  this section when remote RNG is properly connected
*/

    // $w("#button2").label = random(0, 1).toString();
    // $w("#button3").label = random(0, 1).toString();
    // $w("#button4").label = random(0, 1).toString();
    // $w("#button5").label = random(0, 1).toString();
    // $w("#button6").label = random(0, 1).toString();
    // $w("#button7").label = random(0, 1).toString();
    // $w("#button8").label = random(0, 1).toString();
    // $w("#button9").label = random(0, 1).toString();
    // updateByte(array);


       /* This section selects an 8-character word from the TextData db every 1000ms
       to render to the 8 squares at the top of page originally populated with a byte
   */

  wixData.query("SampleData")
    .find()
    .then ((results) => {
      let k = random(0, results.length);
      $w("#button30").label = results.items[k].words[6].toUpperCase();
      $w("#button38").label = results.items[k].words[7].toUpperCase();
      let letterInd = 0;
      for (var i = 37; i > 31; i--){
      /* if the word is less than 8 chars, then an underscore is a placeholder
         however, this feature is not in use since all words are now 8 char words
      */
        if (results.items[k].words[letterInd]){
        $w(`#button${i}`).label = results.items[k].words[letterInd].toUpperCase();
        letterInd++;
      } else {
        $w(`#button${i}`).label = '_';
          letterInd++;
      }
    }
    })
  .catch( (err) => {
    let errorMsg = err;
  });

   /* This section selects an 8-character random word from the dummyWords array every 1000ms
   to render to top of page The 8 squares are originally populated with a byte. Use this version
   if the TextData is not functional
   */

    // var dummyWords = ['DISPLACE', 'EXTREME', 'THERAPY', 'RHETORIC', 'SUITCASE', 'ALTRUISM', 'OFFICIAL', 'SENTENCE', 'AFFINITY', 'PERSONAL', 'RETAILER', 'IDENTITY', 'SPECIMEN', ' HYPNOSIS', 'PARALLEL', 'FAREWELL', 'OBSERVER', 'PRESENCE', 'FEEDBACK', 'STANDARD', 'MOVEMENT', 'DETECTOR', 'CIVILIAN', 'QUESTION', 'QUANTITY', 'ADVOCATE'];
    // var index = Math.floor(Math.random() * ((dummyWords.length - 1 ) - 0 + 1)) + 0;
    // var currentWord = dummyWords[index];
    // let letterInd = 0;
    // $w("#button30").label = currentWord[6];
    // $w("#button38").label = currentWord[7];
    // for (var i = 37; i > 31; i--){
    //   /* if the word is less than 8 chars, then an underscore is a placeholder
    //      however, this feature is not in use since all words are now 8 char words
    //   */
    //   if (!currentWord[letterInd] || currentWord[letterInd] === ' '){
    //     $w(`#button${i}`).label = '_';
    //     letterInd++;
    //   }
    //   if (currentWord[letterInd]){
    //   $w(`#button${i}`).label = currentWord[letterInd];
    //   letterInd++;
    //  }
    // }
    }, 1000);


// When user clicks "select now",
  $w("#button1").onClick((event) => {

   /* This section populates the #text11 section with information from one of five hard-coded entries as an alternative to TextData.
     Uncomment this code as a temporary placeholder only if db queryng is not possible
   */

  var dataEntries = [["Are you ready to 'rock and roll'?","nuclear","Mason","Barker","Adam","Serena","polyandry"], ["A skeleton in the closet","creature","Tristian","Radamaker","Maxwell","Gabriella","transect"], ["If you'd move a bit faster, that would not be bad","haphazard","Sam","Matsumoto","Dustin","Navdeep", "Fibonacci sequence"], ["Snap me a dab, fam","brain","Bobby","Andonian","Marco","Ingrid","turbulence"], ["Cleaning house only near the reverend/priest","discombobulated","Bailey","Ferreira","Deshawn","Milly","pharmacology"], ["It's Silly Brain Time","corporate","Riley","Le","Harrison","Alanis","recursion"] ["Down a rabbit hole","curious","Darian","Miramontes","Bertrand","Maggie","entropy"], ["On their high horse","profitable","Morgan","Lone Wolf","Joah","Johanna","evolution"], ["Full-crank mode","and","Drew","Barnes","Drake","Savannah","Ideal Free Distribution"], ["Pop your clogs","or","Parker","Bachman","Nathaniel","Natasha","contact tracing"], ["Sliding in on a shrimp sandwich","about","Alex","Eriksson","Anthony","Anna","climatologist"],["That'll happen when the crows turn white","Max","Sella","Carver","Danielle","double-blind placebo"]]
  // console.log(dataEntries[random(0, 5)][0])

  // // This is the default text that renders to the screen
  //   $w('#text11').text = `​\n${dataEntries[random(0, dataEntries.length-1)][0]}, consectetur \n​\n${dataEntries[random(0, dataEntries.length-1)][2]} \n \n${dataEntries[random(0, dataEntries.length-1)][3]} \n \n${dataEntries[random(0, dataEntries.length-1)][4]} \n \n${dataEntries[random(0, dataEntries.length-1)][5]}t \n \n[Question]minim veniam, quis nostrud exercitation ullamco laboris nisi? \n \n[Answer]ut aliquip ex ea commodo consequat \n \n${dataEntries[random(0, dataEntries.length-1)][1]} \n \n​${dataEntries[random(0, dataEntries.length-1)][6]} \n \n[Coming soon: actual lyrics]`


   /* This sectionpulls from the actual TextData db and populates #text11 with data from the table
     at a pseudo-randomly generated index
   */

  wixData.query("SampleData")
    .find()
    .then ((results)=> {
      console.log('results.items for text11', results.items)
      let k = random(0, results.length);
      console.log("results.length", results.length);
      console.log('results.items[k]', results.items[k]);
      $w('#text11').text = `​\n${results.items[random(0, results.length)].phrases} \n​\n${results.items[random(0, results.length)].firstName} \n \n${results.items[random(0, results.length)].lastName} \n \n${results.items[random(0, results.length)].questions} \n \n${results.items[random(0, results.length)].answers} \n \n${results.items[random(0, results.length)].scienceTerms} \n \n${results.items[random(0, results.length)].songLyrics} \n \n${results.items[random(0, results.length)].words} \n \n​${results.items[random(0, results.length)].feminineFirstName} \n \n​${results.items[random(0, results.length)].masculineFirstName}`
    })
  .catch( (err) => {
    let errorMsg = err;
  });

})




//  const max10CharWords = words.filter()
//    .gt("words", 20);
//    console.log('max10CharWords', max10CharWords)

//  $w("#myDataset").setFilter(customerFilter);

// sampleData.get("myCollection", "00001")
//   .then( (item) => {
//     item.last_name = "Smith"; // updated last name
//     wixData.update("myCollection", item);
//   } )
//   .catch( (err) => {
//     let errorMsg = err;
//   } );

});