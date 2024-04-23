document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('compareButton').addEventListener('click', function() {
    const jobDescription = document.getElementById('jobDescriptionInput').value.trim();
    const resume = document.getElementById('resumeInput').value.trim();

    if (jobDescription === '' || resume === '') {
      alert('Please paste both job description and resume texts.');
      return;
    }

    const missingKeywords = compareKeywords(jobDescription, resume);
    displayComparisonResult(missingKeywords);
  });
});

function compareKeywords(jobDescription, resume) {
  const stopWords = [
    'i', 'me', 'my', 'myself', 'we', 'our', 'ours', 'ourselves', 'you', 'your', 'yours', 'yourself', 'yourselves',
    'he', 'him', 'his', 'himself', 'she', 'her', 'hers', 'herself', 'it', 'its', 'itself', 'they', 'them', 'their',
    'theirs', 'themselves', 'what', 'which', 'who', 'whom', 'this', 'that', 'these', 'those', 'am', 'is', 'are', 'was',
    'were', 'be', 'been', 'being', 'have', 'has', 'had', 'having', 'do', 'does', 'did', 'doing', 'a', 'an', 'the', 'and',
    'but', 'if', 'or', 'because', 'as', 'until', 'while', 'of', 'at', 'by', 'for', 'with', 'about', 'against', 'between',
    'into', 'through', 'during', 'before', 'after', 'above', 'below', 'to', 'from', 'up', 'down', 'in', 'out', 'on', 'off',
    'over', 'under', 'again', 'further', 'then', 'once', 'here', 'there', 'when', 'where', 'why', 'how', 'all', 'any', 'both',
    'each', 'few', 'more', 'most', 'other', 'some', 'such', 'no', 'nor', 'not', 'only', 'own', 'same', 'so', 'than', 'too',
    'very', 's', 't', 'can', 'will', 'just', 'don', 'should', 'now'
  ];

  const cleanText = (text) => {
    return text.toLowerCase().split(/\s+/).filter(word => !stopWords.includes(word));
  };

  const jobKeywords = cleanText(jobDescription);
  const resumeKeywords = cleanText(resume);

  const missingKeywords = jobKeywords.filter(keyword => !resumeKeywords.includes(keyword));

  return missingKeywords;
}

function displayComparisonResult(missingKeywords) {
  const missingKeywordsList = document.getElementById('missingKeywords');
  missingKeywordsList.innerHTML = '';

  if (missingKeywords.length === 0) {
    missingKeywordsList.innerHTML = '<li>No missing keywords found in the resume.</li>';
  } else {
    missingKeywords.forEach(keyword => {
      const listItem = document.createElement('li');
      listItem.textContent = keyword;
      missingKeywordsList.appendChild(listItem);
    });
  }
}
