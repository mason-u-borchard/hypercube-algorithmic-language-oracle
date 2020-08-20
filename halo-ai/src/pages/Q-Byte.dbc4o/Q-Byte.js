// For full API documentation, including code examples, visit https://wix.to/94BuAAs
import sampleData from 'wix-data';
import {getRandomBytes} from 'backend/getRandomBytes.jsw';
import {getRandomByteExpress} from 'backend/express.jsw';
import wixData from 'wix-data';
import words from "wix-data";
import {fetch} from 'wix-fetch';



// In http-functions.js
// URL looks like:
// https://www.mysite.com/_functions/myFunction/findMe
// or:
// https://user.wixsite.com/mysite/_functions/myFunction/findMe


$w.onReady(function () {
  console.log('page is loading');
  // console.log(getRand())

  function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
  }


 /* This function changes 'UP_TO_TEN_' to a different random word and
  simultaneously renders a different random byte every 1000ms */
setInterval(function() {
  /* getRandomBytes() will either grab data from python ec2 Ubuntu, javascript ec2 Ubuntu, or the built-in express pseudoRNG depending on which version of getRandomBytes() is enabled in getRandomBytes.jsw */
var array = getRandomBytes().then((res) => {
  console.log(res)
  return res;
})
	/* .then block for built-in express PseudoRNG */
//   .then((byte) => {
//   var bits = byte.split(',');
//     $w("#button2").label = bits[0];
//     $w("#button3").label = bits[1];
//     $w("#button4").label = bits[2];
//     $w("#button5").label = bits[3];
//     $w("#button6").label = bits[4];
//     $w("#button7").label = bits[5];
//     $w("#button8").label = bits[6];
//     $w("#button9").label = bits[7];
// })

	/* .then block for Python PseudoRNG */
.then((byte) => {
  var byteStr = byte.slice(1, byte.length - 2);
  var bits = byteStr.split(' ');
    $w("#button2").label = bits[0];
    $w("#button3").label = bits[1];
    $w("#button4").label = bits[2];
    $w("#button5").label = bits[3];
    $w("#button6").label = bits[4];
    $w("#button7").label = bits[5];
    $w("#button8").label = bits[6];
    $w("#button9").label = bits[7];
})

	/* .then block for Javascript PseudoRNG */
// .then((byteArr) => {
//    let j = random(0, byteArr.length - 1);
//       var currentByte = byteArr[j].split(',');
//       $w("#button2").label = currentByte[0];
//       $w("#button3").label = currentByte[1];
//       $w("#button4").label = currentByte[2];
//       $w("#button5").label = currentByte[3];
//       $w("#button6").label = currentByte[4];
//       $w("#button7").label = currentByte[5];
//       $w("#button8").label = currentByte[6];
//       $w("#button9").label = currentByte[7];
// })
.catch( () => {
  // let errorMsg = err;
  console.log(`error getting random byte from server, using hard-coded pseudoRNG instead`);
  /* this section is a hard-coded subsitute to create pseudo-pseudo random bytes
  every 1000ms instead of pulling data from .txt file from remote server. This serves as back up for when the server is down
*/

$w("#button2").label = random(0, 1).toString();
$w("#button3").label = random(0, 1).toString();
$w("#button4").label = random(0, 1).toString();
$w("#button5").label = random(0, 1).toString();
$w("#button6").label = random(0, 1).toString();
$w("#button7").label = random(0, 1).toString();
$w("#button8").label = random(0, 1).toString();
$w("#button9").label = random(0, 1).toString();
});



    /* This section selects an 8-character word from the TextData db every 1000ms
       to render to the 8 squares at the top of page originally populated with a byte
   */

  wixData.query("SampleData")
    .find()
    .then ((results) => {
      let k = random(0, results.length);
      // console.log('results.items[k].words', results.items[k].words)
      if (results.items[k].words.length !== 8) {
        k = random(0, results.length);
        // console.log('redo results.items[k].words', results.items[k].words)
      }
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
    console.log(`error getting 8 char word: ${errorMsg}`)
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

   /* This section pulls from the actual TextData db and populates #text11 with data from the table at a pseudo-randomly generated index for each column
   */
  console.log('select now has been clicked! !')
  wixData.query("SampleData")
    .find()
    .then ((results)=> {
      $w('#text11').text = `​\n${results.items[random(0, results.length)].phrases} \n​\n${results.items[random(0, results.length)].firstName} \n \n${results.items[random(0, results.length)].lastName} \n \n${results.items[random(0, results.length)].questions} \n \n${results.items[random(0, results.length)].answers} \n \n${results.items[random(0, results.length)].scienceTerms} \n \n${results.items[random(0, results.length)].songLyrics} \n \n${results.items[random(0, results.length)].words} \n \n​${results.items[random(0, results.length)].feminineFirstName} \n \n​${results.items[random(0, results.length)].masculineFirstName}`
    })
  .catch( (err) => {
    let errorMsg = err;
    console.log(`error getting data after 'select now' was clicked: ${errorMsg}`)
  });

})


/* use max10CharWords to filter words from dataset that are 10 chars or less*/

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