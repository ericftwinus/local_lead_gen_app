const questions = [
  {
    text: "Do you have prior experience in deck construction or woodworking?",
    yes: 1,
    no: -1,
    explanation:
      "Experience: Possessing basic to intermediate experience in deck construction or woodworking is crucial when undertaking a DIY deck project. This includes having a grasp on construction techniques, materials, and safety protocols, which ensures a smooth and efficient building process.",
  },
  {
    text: "Do you have sufficient time to commit to the project?",
    yes: 2,
    no: -1,
    explanation:
      "Time: The average DIY deck project requires a considerable time investment. You should be prepared to commit several consecutive days or weekends to complete the project. Additionally, having the flexibility to handle potential delays and the ability to balance the project with other responsibilities is essential.",
  },
  {
    text: "Do you have access to the necessary tools and a budget for materials?",
    yes: 3,
    no: -1,
    explanation:
      "Tools & Budget: Access to necessary tools and a well-defined budget play a significant role in building a deck. Essential tools include saws, drills, and measuring devices, while a comprehensive budget should cover materials, permits, and any unforeseen costs. Having the resources and ability to source materials at competitive prices further contributes to a successful DIY deck project.",
  },
];

let currentQuestionIndex = 0;
let questionContainer = document.querySelector('.question');
let explanationContainer = document.querySelector('.explanation');
let thanksContainer = document.querySelector('.thanks');

function textRevealAnimation() {
  const text = document.querySelector('.question p');
  let newText = '';
  let counter = 0;
  gsap.set(text, { opacity: 1 });
  const typing = setInterval(() => {
    newText += text.textContent[counter];
    text.textContent = newText;
    counter++;
    if (counter === text.textContent.length) {
      clearInterval(typing);
    }
  }, 50);


  var tl = gsap.timeline({id: "timeline"})
  tl.to(".orange", {duration: 1, x: 700, id: "orange"})
    .to(".green", {duration: 2, x: 700, ease: "bounce", id: "green"});
  
  //give this tween an id
  gsap.to(".grey", {duration: 1, x: 700, rotation: 360, delay: 3, id: "grey"})
  

}

function stripedBackgroundAnimation() {
  const leftContainer = document.querySelector('.left');
  const rightContainer = document.querySelector('.right');

  const stripes = Array.from({ length: 5 }, (_, i) => {
    const stripe = document.createElement('div');
    stripe.classList.add('stripe');
    stripe.style.transform = `rotate(${i * 36}deg)`;
    document.body.appendChild(stripe);
    return stripe;
  });

  const redStripe = createStripe(leftContainer);
  const blackStripe = createStripe(rightContainer);

  gsap.to(stripes, {
    duration: 1,
    scaleX: 20,
    stagger: 0.1,
    repeat: -1,
    yoyo: true,
    ease: 'power2.inOut',
  });
}

function formFieldAnimation() {
  gsap.from('.question button, input', {
    duration: 1,
    y: 50,
    opacity: 0,
    stagger: 0.2,
    delay: 1,
    ease: 'power2.out',
  });
}

function buttonAnimation() {
  gsap.from('.question button', {
    duration: 1,
    x: 100,
    opacity: 0,
    scale: 0.5,
    delay: 1.5,
    ease: 'elastic.out(1, 0.5)',
  });
}

function displayQuestion() {
  questionContainer.innerHTML = `
      <p>${questions[currentQuestionIndex].text}</p>
      <button onclick="handleYesClick()" class="fade-in">Yes</button>
      <button onclick="handleNoClick()" class="fade-in">No</button>
  `;
  explanationContainer.innerHTML = '';
  displayExplanation();
  textRevealAnimation();
  //buttonAnimation();
  //stripedBackgroundAnimation();
  //formFieldAnimation();
 
}

function textRevealAnimation() {
  const text = document.querySelector('.question p');
  const splitText = new SplitText(text, { type: 'words' });
  const chars = splitText.words;

  gsap.set(chars, { opacity: 0, scale: 0 });

  const typing = (index) => {
   if (index < chars.length) {
      gsap.to(chars[index], { opacity: 1, scale: 1, duration: 1, ease: 'elastic.out(1, 0.5)' });
      setTimeout(() => typing(index + 1), 50);
    }
  };

  typing(0);
}


function displayExplanation() {
  const explanationList = questions[currentQuestionIndex].explanation
    .split(':')
    .map((item, index) => {
      if (index === 0) {
        return `<strong>${item.trim()}:</strong>`;
      } else {
        return `<li>${item.trim()}</li>`;
      }
    })
    .join('');

  explanationContainer.innerHTML = `
    <ul class="fade-in">
      ${explanationList}
    </ul>
  `;

  // Animate background color and text color
  gsap.to(explanationContainer, {
    duration: 1,
    backgroundColor: gsap.utils.random(["#ff9999", "#99ccff", "#ccff99", "#ffcc99", "#ff99cc"]),
    color: gsap.utils.random(["#333333", "#ffffff", "#111111"]),
    ease: "power2.out",
  });
}

function handleYesClick() {
  if (currentQuestionIndex === questions.length - 1) {
      displayEmailInput();
  } else {
      currentQuestionIndex = questions[currentQuestionIndex].yes;
      displayQuestion();
      displayExplanation(); // Move this line after displayQuestion()
  }
}
function showHireContractorScreen() {
  questionContainer.innerHTML = `
      <p class="fade-in">Hire A Contractor</p>
      <p class="fade-in">Please enter your email address:</p>
      <input type="email" id="email" placeholder="Enter your email" class="fade-in">
      <button onclick="submitEmail('hire')" class="fade-in">Submit</button>
  `;
  explanationContainer.innerHTML = `
      <p class="fade-in">We'd love to help you find a great contractor!</p>
  `;
}

function handleNoClick() {
  displayExplanation();
  setTimeout(showHireContractorScreen, 10);
}

function displayEmailInput() {
  questionContainer.innerHTML = `
      <p class="fade-in">Please enter your email address:</p>
      <input type="email" id="email" placeholder="Enter your email" class="fade-in">
      <button onclick="submitEmail()" class="fade-in">Submit</button>
  `;
  explanationContainer.innerHTML = '<p class="fade-in">You could be a good fit for a DIY project!</p>';
}

function submitEmail(action) {
  let email = document.getElementById('email').value;
  if (email) {
      // You can replace the following console log with an actual email submission functionality
      console.log('Email submitted:', email);
      showThanksScreen(action);
  } else {
      alert('Please enter a valid email address.');
  }
}


function showThanksScreen(action) {
  let thanksMessage = action === 'hire' ? 'Thanks for choosing to hire a contractor!' : 'Thanks for using our app!';
  const thanksContainer = document.querySelector('.thanks');
  const messageElement = document.createElement('p');
  messageElement.innerHTML = thanksMessage;
  //const leftContainer = document.querySelector('.left');
  //const rightContainer = document.querySelector('.right');

  makeanimationsgreat(thanksMessage);

  document.querySelector('.container').style.display = 'none';
  thanksContainer.style.display = 'flex';
  //thanksContainer.style.display = 'flex';

  // Create the .fade-in paragraph element and set its innerHTML
  //const fadeInParagraph = document.createElement('p');
  //fadeInParagraph.className = 'fade-in';
  //fadeInParagraph.innerHTML = thanksMessage;

  // Append the fadeInParagraph to the thanksContainer
  //thanksContainer.appendChild(fadeInParagraph);
}

function makeanimationsgreat(thanksMessage){
  let dots = [],
  bg = document.querySelector("#featureBackground"),
  i, dot;

// create 80 dot elements and put them in an array
for (i = 0; i < 80; i++) {
  dot = document.createElement("div");
  dot.setAttribute("class", "dot");
  bg.appendChild(dot);
  dots.push(dot);
}

//set the initial position of all the dots, and pick a random color for each from an array of colors
gsap.set(dots, {
  backgroundColor: "random([#663399,#84d100,#cc9900,#0066cc,#993333])",
  scale: "random(0.4, 1)",
  x:400,
  y:300
});

// create the physics2D animation
let tween = gsap.to(dots, {
    duration: 2.5,
    physics2D: {
      velocity: "random(200, 650)",
      angle: "random(250, 290)",
      gravity: 500
    },
    delay: "random(0, 2.5)"
  });

  const messageElement = document.createElement('p');
  messageElement.className = 'fade-in';
  messageElement.innerHTML = thanksMessage;
  bg.appendChild(messageElement);

  const splitText = new SplitText(messageElement, { type: 'characters' });
  const chars = splitText.words;

  gsap.set(chars, { opacity: 0, scale: 0 });

  const typing = (index) => {
   if (index < chars.length) {
      gsap.to(chars[index], { opacity: 1, scale: 1, duration: 1, ease: 'elastic.out(1, 0.5)' });
      setTimeout(() => typing(index + 1), 50);
    }
  };

  typing(0);

}

displayQuestion();

