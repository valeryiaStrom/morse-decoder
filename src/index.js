const MORSE_TABLE = {
    '.-':     'a',
    '-...':   'b',
    '-.-.':   'c',
    '-..':    'd',
    '.':      'e',
    '..-.':   'f',
    '--.':    'g',
    '....':   'h',
    '..':     'i',
    '.---':   'j',
    '-.-':    'k',
    '.-..':   'l',
    '--':     'm',
    '-.':     'n',
    '---':    'o',
    '.--.':   'p',
    '--.-':   'q',
    '.-.':    'r',
    '...':    's',
    '-':      't',
    '..-':    'u',
    '...-':   'v',
    '.--':    'w',
    '-..-':   'x',
    '-.--':   'y',
    '--..':   'z',
    '.----':  '1',
    '..---':  '2',
    '...--':  '3',
    '....-':  '4',
    '.....':  '5',
    '-....':  '6',
    '--...':  '7',
    '---..':  '8',
    '----.':  '9',
    '-----':  '0',
};

function decode(expr) {
    // write your solution here

    let arrFromMorseAlphabet = Object.entries(MORSE_TABLE);  //now we have array of arrays containing key-pair values from MORSE_TABLE
		
		for (let array of arrFromMorseAlphabet) {
			
            let keyValue = array[0];
            
				while (keyValue.length < 10) {  //if key length for any symbol is less than 10 it's left padded with zero
					let keyValueArr = keyValue.split("")
					keyValueArr.unshift("0");
					keyValue = keyValueArr.join("");
	
				}
			
               
		  array[0] = keyValue; //replace the keys with ones populated with zeros
			
		}
		
		for (let array of arrFromMorseAlphabet) {
			
			let keyValue = array[0];
			let keyValueArr = keyValue.split("");
			let dotIndexes = [];
			let hyphenIndexes = [];	
            let dotPosition = 0;
			let hyphenPosition = 0;
			
			while (true) {  //here we find indexes where dots are placed and replace them with "10"
			
			  let indexOfDot = keyValueArr.indexOf(".", dotPosition);
			  
			  if (indexOfDot == -1) break;  //if there are no dots - stop the cycle
			  			  
			  keyValueArr[indexOfDot] = "10";

			  dotPosition = indexOfDot + 1; // continue to look for dots from the next position
			}
					
			while (true) {   //here we find indexes where hyphens are placed and replace them with "11"
			
			  let indexOfHyphen = keyValueArr.indexOf("-", hyphenPosition);
			  			  
			  if (indexOfHyphen == -1) break;  //if there are no hyphens - stop the cycle
			  			  
			  keyValueArr[indexOfHyphen] = "11";

			  hyphenPosition = indexOfHyphen + 1; // continue from the next position
			}
				
			//now our keyValues are arrays that consist of 1s and 0s 
			
			keyValue = keyValueArr.join(""); //change it to strings
									
            while (keyValue.length > 10) { //get rid of excessive zeros so that the string length was equal to 10
                
					let keyValueArrNew = keyValue.split("")
                    keyValueArrNew.shift();
					keyValue = keyValueArrNew.join("");	
				}
			
			array[0] = keyValue; // put it back to array of key-value pairs 
			
		}
		   
        let encodedSymbolsArray = [];
		
		 for (let i = 0; i < expr.length; i+=10) {

              encodedSymbolsArray.push(expr.substr(i, 10)); //we divide input string to letters by 10 symbols
	
		   }
		   
		let decodedLettersArray = [];
		 
		for (let letter of encodedSymbolsArray) {
			 
			if (letter === "**********") {

				decodedLettersArray.push(" ");
			}
			 
			for (let keyValuePair of arrFromMorseAlphabet) {

                    if (letter === keyValuePair[0]) {  //look for decoded symbols and push them to array
                        
						decodedLettersArray.push(keyValuePair[1]);
						
					}
					
				}
		}
		 
    let outputStr = decodedLettersArray.join("");  // convert array of decoded symbols into string
    
    return outputStr;

 }
    

module.exports = {
    decode
}