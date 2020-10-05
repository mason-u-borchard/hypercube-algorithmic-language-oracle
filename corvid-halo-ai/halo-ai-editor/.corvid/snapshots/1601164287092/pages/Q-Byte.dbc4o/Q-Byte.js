// For full API documentation, including code examples, visit https://wix.to/94BuAAs
import { LanguageData1, SampleData } from "wix-data";
import { getRandomBytes } from "backend/getRandomBytes.jsw";
import wixData from "wix-data";
import words from "wix-data";
import { fetch } from "wix-fetch";

// In http-functions.js
// URL looks like:
// https://www.mysite.com/_functions/myFunction/findMe
// or:
// https://user.wixsite.com/mysite/_functions/myFunction/findMe
var clickHistory = {};
$w.onReady(function () {
  console.log("page is loading");
  console.log(getRandomBytes);
  console.log("clickHistory1: ", clickHistory);

  ///******************************///
  ///****** helper functions ******///
  ///*****************************///

  /// gets a pseudo random byte ///
  function random(min, max) {
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    return num;
  }

  /// gets the current date and time in PST ///
  function getCurrentDateAndTime() {
    var date = new Date();
    var utcDate = new Date(date.toUTCString());
    utcDate.setHours(utcDate.getHours() - 7);
    var usDate = new Date(utcDate);
    console.log(usDate);
    return usDate;
  }

  /* This function changes 'UP_TO_TEN_' to a different random word and
  simultaneously renders a different random byte every 1000ms */
  setInterval(function () {
    // var array = returnDataArr().then((res) => {
    //     console.log('resss', res)
    //     return res;
    // })
    /* getRandomBytes() will either grab data from python ec2 Ubuntu, javascript ec2 Ubuntu, or the built-in express pseudoRNG depending on which version of getRandomBytes() is enabled in getRandomBytes.jsw */
    var array = getRandomBytes()
      .then((res) => {
        console.log(res);
        return res;
      })
      /* .then block for built-in express PseudoRNG */
      // .then((byte) => {
      // console.log('byte from dataArr', byte);
      // var bits = byte;
      // $w("#button2").label = bits[0];
      // $w("#button3").label = bits[1];
      // $w("#button4").label = bits[2];
      // $w("#button5").label = bits[3];
      // $w("#button6").label = bits[4];
      // $w("#button7").label = bits[5];
      // $w("#button8").label = bits[6];
      // $w("#button9").label = bits[7];
      // })

      /* .then block for Python PseudoRNG */
      .then((byte) => {
        var byteStr = byte.slice(1, byte.length - 2);
        var bits = byteStr.split(" ");
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
      .catch(() => {
        // let errorMsg = err;
        console.log(
          `error getting random byte from server, using hard-coded pseudoRNG instead`
        );
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

    wixData
      .query("SampleData")
      .find()
      .then((results) => {
        let k = random(0, results.length);
        // console.log('results.items[k].words', results.items[k].words)
        if (results.items[k].words.length !== 8) {
          k = random(0, results.length);
          // console.log('redo results.items[k].words', results.items[k].words)
        }
        $w("#button30").label = results.items[k].words[6].toUpperCase();
        $w("#button38").label = results.items[k].words[7].toUpperCase();
        let letterInd = 0;
        for (var i = 37; i > 31; i--) {
          /* if the word is less than 8 chars, then an underscore is a placeholder
         however, this feature is not in use since all words are now 8 char words
      */
          if (results.items[k].words[letterInd]) {
            $w(`#button${i}`).label = results.items[k].words[
              letterInd
            ].toUpperCase();
            letterInd++;
          } else {
            $w(`#button${i}`).label = "_";
            letterInd++;
          }
        }
      })
      .catch((err) => {
        let errorMsg = err;
        console.log(`error getting 8 char word: ${errorMsg}`);
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

  //// When user clicks "select now",
  $w("#button1").onClick((event) => {
    console.log(`clickHistory before is ${clickHistory}`);
    var currentDateAndTime = getCurrentDateAndTime();
    console.log(typeof currentDateAndTime);
    console.log("currentDateAndTime: ", currentDateAndTime);

    // console.log("currentDateAndTime:.split", currentDateAndTime.split(' '));

    // if (clickHistory[currentDateAndTime] === undefined) {
    //   clickHistory[currentDateAndTime] = [
    //     $w("#button2").label,
    //     $w("#button3").label,
    //     $w("#button4").label,
    //     $w("#button5").label,
    //     $w("#button6").label,
    //     $w("#button7").label,
    //     $w("#button8").label,
    //     $w("#button9").label,
    //   ];
    // }

    clickHistory.currentDateAndTime = [
      $w("#button2").label,
      $w("#button3").label,
      $w("#button4").label,
      $w("#button5").label,
      $w("#button6").label,
      $w("#button7").label,
      $w("#button8").label,
      $w("#button9").label,
    ];
    console.log(`clickHistory values  ${Object.values(clickHistory)}`);
    console.log(`clickHistory keys  ${Object.keys(clickHistory)}`);
    /* This section pulls from the actual TextData db and populates #text11 with data from the table at a pseudo-randomly generated index for each column
     */
    // console.log('select now has been clicked! !')
    wixData
      .query("LanguageData1")
      // wixData.query("SampleData")
      .find()
      .then((data) => {
        var languageDataSelections = [];
        var languageStr = "\n";
        var categories = [
          "general",
          "blog",
          "web",
          "tv",
          "spoken",
          "fiction",
          "magazine",
          "news",
          "academic",
          "female name",
          "male name",
          "last_name",
          "state_capital_city",
          "country capital",
          "art terms",
          "philosophy",
          "strong",
        ];
        for (var i = 0; i < categories.length; i++) {
          var currentCol = categories[i];
          var a = random(0, 50);
          if (data.items[a][currentCol] !== undefined) {
            languageDataSelections.push(data.items[a][currentCol]);
            languageStr += `${data.items[a][currentCol]}\n \n`;
          }
          //  else {
          //   data.items[a] = data.items[random(3,10)]
          //   // a = random(0, 50);
          //   // while(!data.items.items[a].currentCol){
          //   //   a = random(0, 50);
          //   // }
          //   languageDataSelections.push(data.items[a][currentCol]);
          //   languageStr += `${data.items[a][currentCol]}\n \n`;
          // }
        }

        $w("#text11").text = languageStr;
        /* this section puts together random indeces of SampleData */
        //$w('#text11').text = `​\n${data.items.items[random(0, data.items.length)].phrases} \n​\n${data.items.items[random(0, data.items.length)].firstName} \n \n${data.items.items[random(0, data.items.length)].lastName} \n \n${data.items.items[random(0, data.items.length)].questions} \n \n${data.items.items[random(0, data.items.length)].answers} \n \n${data.items.items[random(0, data.items.length)].scienceTerms} \n \n${data.items.items[random(0, data.items.length)].songLyrics} \n \n${data.items.items[random(0, data.items.length)].words} \n \n​${data.items.items[random(0, data.items.length)].feminineFirstName} \n \n​${data.items.items[random(0, data.items.length)].masculineFirstName}`
      })
      .catch((err) => {
        let errorMsg = err;
        console.log(
          `error getting data after 'select now' was clicked: ${errorMsg}`
        );
      });
  });

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
