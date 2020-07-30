const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

function showLoadingSpinner(){
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function removeLoadingSpinner(){
  if (!loader.hidden){
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}

// Get Quote from API
async function getQuote(){
  showLoadingSpinner();
  const proxyUrl ='http://cors-anywhere.herokuapp.com/'
  const apiUrl ='http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
  try{
    const response = await fetch(proxyUrl + apiUrl);
    const data = await response.json();
    // If Author is blank, add 'Unknown'
    if (data.quoteAuthor === '') {
      authorText.innerHTML = 'Unknown'
    } else {
      authorText.innerHTML = data.quoteAuthor;
    }
    // Reduce font size for long quotes
    if (data.quoteText.length > 120){
      quoteText.classList.add('long-quote');
    } else {
      quoteText.classList.remove('long-quote');
    }
    quoteText.innerHTML = data.quoteText;
    // Stop Loader, Show quote
    removeLoadingSpinner();
    // console.log(data);
  } catch (error) {
    getQuote();
    // console.log('Whoops, no quote', error)
  }
}

// Tweet Quote
function tweetQuote () {
  const quote = quoteText.innerHTML;
  const author = authorText.innerHTML;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, '_blank');
}

// Even Listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuote();

