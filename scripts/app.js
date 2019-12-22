const ItemCtrl = (function () {


  const state = {
    selectedCuisines: [],
    selectedDiet: '',
    selectedTime: 0,
    selectedIngredient: '',
  }

  return {

      apiCallRecipeInstruction: () => {
      axios.get(`https://api.spoonacular.com/recipes/667024/information?includeNutrition=false&apiKey=`)
        .then(function (response) {
          // handle success
          console.log(response)

        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .finally(function () {
          // always executed
        });
    },


    apiCallRecipes: () => {
      let cuisineToString;
      let queryString;


      // Check if more than one cuisine is chosen and convert array to string if true. 
      state.selectedCuisines.length > 1 ? cuisineToString = state.selectedCuisines.toString() : null;


      // Modify the API query string depending on the users input choice. 
      if (state.selectedDiet === 'none' && state.selectedCuisines.includes('Anything')) {
        return
      } else if (state.selectedDiet !== 'none' && state.selectedCuisines[0].value != 'Anything') {

        queryString = `&diet=${state.selectedDiet}&cuisine=${cuisineToString}`
      } else if (state.selectedDiet !== 'none' && state.selectedCuisines[0].value != 'Anything') {
        queryString = `&cuisine=${cuisineToString}`
      } else {
        queryString = `&diet=${state.selectedDiet}`
      }

      // Make a request for a user with a given ID
      axios.get(`https://api.spoonacular.com/recipes/search?query=${state.selectedIngredient}${queryString}&instructionsRequired=true&number=5&apiKey=`)
        .then(function (response) {
          // handle success
          console.log(response)
          UICtrl.renderRecipeSuggestions(response);

        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .finally(function () {
          // always executed
        });
    },

    getState: () => {
      return state
    }
  }


})();

const UICtrl = (function () {

  const UISelectors = {
    // Buttons
    btnBanner: '#btn-banner',
    btnFormOne: '#btn-form-1',
    btnFormTwo: '#btn-form-2',
    btnPrimary: '.btn-primary',
    btnYes: '#btn-yes',
    btnNo: '#btn-no',
    // Popup 
    closePopup: '.fa-times',
    errorPopup: '.error-popup',

    // Form submissions
    selectDiet: '#select-diet',
    formInputNumber: '.form-input-number',

    // General selectors
    wrapContent: '.wrap-content',
    container: '.container',

    // animations
    bannerTitle: '.banner-title',
    bannerParagraph: '.banner-paragraph',
    btnBanner: '#btn-banner',
    formControl: '.form-control',
    bannerMain: '.banner-main',
    titleCuisine: '.title-cuisine',
    titleIngredient: '#title-ingredient',
    queryInput: '.query-input',
    inputName: '.input-name',
    titleDiet: '.title-diet',
    selectDiet: '#select-diet',
  }


  const state = ItemCtrl.getState();


  return {


    renderRecipeSuggestions: () => {
      let html;

      recipeData.data.results.forEach(recipe => {
        html = `
        <div class="wrap-content">
        <h2 class="title">Let's cook some</h2>
        <h2 class="title recipe">${recipe.title}</h2>
        <button class="btn-choice" id="btn-yes">Yay</button>
        <button class="btn-choice" id="btn-no">Nay</button>
        </div>
        `
        document.querySelector(UISelectors.container).insertAdjacentHTML('beforeend', html);
      })

      document.querySelector(UISelectors.btnYes).addEventListener('click', () => {
        UICtrl.apiCallRecipeInstruction();
      });
    },

    renderDietChoice: () => {
      let html = `<div class="wrap-content">
    <h2 style="margin-bottom:40px" class="title title-diet">Any diets or
      intolerances?</h2>
      <div class="form-dropdown">
      <select id="select-diet" name="diet" class="select-dropdown">
        <div style="box-shadow: 0 0 15px rgba(0,0,0,0.2); height:100%; width:100%; overflow:hidden;">
        <option value="none">None</option>
        <option value="vegan">Vegan</option>
        <option value="keto">Keto</option>
        <option value="vegetarian">Vegetarian</option>
        <option value="gluten-free">Gluten Free</option>
        <option value="paleo">Paleo</option>
        <option value="lacto-vegetarian">Lacto Vegetarian</option>
      </div>
      </select>
      <button id="btn-form-2" class="btn-primary">let's go!</button>
    </div>
  </div>`

      document.querySelector(UISelectors.container).insertAdjacentHTML('afterbegin', html);

      UICtrl.generalFadeIn(UISelectors.titleDiet, UISelectors.selectDiet, UISelectors.btnPrimary);
      document.querySelector(UISelectors.btnPrimary).addEventListener('click', () => {
        // Get the selected value from the dropdown menu.
        let e = document.querySelector(UISelectors.selectDiet);
        let selectedDietValue = e.options[e.selectedIndex].value;
        state.selectedDiet = selectedDietValue
        ItemCtrl.apiCallRecipes();
        document.querySelector(UISelectors.wrapContent).remove();
      })
    },

    renderIngredientChoice: () => {
      let html = `    <div class="wrap-content">
    <h2 id="title-ingredient" class="title">I wanna find recipes that includes</h2>
    <input class="query-input" type="text" placeholder="Ex. Pork">
    <button id="btn-banner" class="btn-primary">Next</button>
  </div>`

      document.querySelector(UISelectors.container).insertAdjacentHTML('afterbegin', html);
      UICtrl.fadeinIngredientChoice();


      document.querySelector(UISelectors.queryInput).addEventListener('keyup', e => {
        state.selectedIngredient = e.target.value
      });


      document.querySelector(UISelectors.btnPrimary).addEventListener('click', () => {


        if (state.selectedIngredient != '') {
          UICtrl.generalFadeOut(UISelectors.titleIngredient, UISelectors.queryInput, UISelectors.btnPrimary);

          document.querySelector(UISelectors.errorPopup) != null ? document.querySelector(UISelectors.errorPopup).remove() : '';

          setTimeout(function () {
            document.querySelector(UISelectors.wrapContent).remove();
          }, 1650);
          setTimeout(function () {
            UICtrl.renderCuisineChoice();
          }, 1700);
        } else {
          UICtrl.renderErrorComponent();

        }
      })
    },

    renderErrorComponent: () => {
      let html = `
      <div class="error-popup">
      <i class="fas fa-times"></i>
      <img class="popup-background" src="./stylesheets/components/images/background-icon5.svg" alt="">
      <h2 class="error-popup-title">Oops!</h2>
      <p class="error-popup-paragraph">Please make sure you filled in the form correctly.</p>
    </div>
      `

      document.querySelector('body').insertAdjacentHTML('afterbegin', html);

      document.querySelector(UISelectors.closePopup).addEventListener('click', () => {
        document.querySelector(UISelectors.errorPopup).remove();
      })
    },

    renderCuisineChoice: () => {
      let html = `
    <div class="wrap-content">
    <h2 style="margin-bottom:40px" class="title title-cuisine">What type of
    food do you
    want to cook?</h2>
    <div class="group-form">

        <div class="form-control">
        <input value="Anything" id="check13" class="checkbox" type="checkbox" >
        <label for="check13"
        style="background:linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('./stylesheets/components/images/anything.jpg'); background-position: center; background-size:cover;"
          class="input-name">Anything
        </label>
      </div>

      <div class="form-control">
        <input value="American" id="check1" class="checkbox" type="checkbox" >
        <label for="check1"
         style="background:linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('./stylesheets/components/images/american.jpg'); background-position: center; background-size:cover;"
          class="input-name">American
        </label>
      </div>


      <div class="form-control">
        <input value="chinese" id="check2" class="checkbox" type="checkbox" >
        <label for="check2"
          style="background:linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('./stylesheets/components/images/chinese.jpg'); background-position: center; background-size:cover;"
          class="input-name">Chinese
        </label>
      </div>


      <div class="form-control">
        <input value="french" id="check3" class="checkbox" type="checkbox" >
        <label for="check3"
          style="background:linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('./stylesheets/components/images/french.jpg'); background-position: center; background-size:cover;"
          class="input-name">French
        </label>
      </div>
      <div class="form-control">
        <input value="german" id="check4" class="checkbox" type="checkbox" >
        <label for="check4"
          style="background:linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('./stylesheets/components/images/german.jpg'); background-position: center; background-size:cover;"
          class="input-name">German
        </label>
      </div>


      <div class="form-control">
        <input value="indian" id="check5" class="checkbox" type="checkbox" >
        <label for="check5"
          style="background:linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('./stylesheets/components/images/indian.jpg'); background-position: center; background-size:cover;"
          class="input-name">Indian
        </label>
      </div>


      <div class="form-control">
        <input value="italian" id="check6" class="checkbox" type="checkbox" >
        <label for="check6"
          style="background:linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('./stylesheets/components/images/italian.jpg'); background-position: center; background-size:cover;"
          class="input-name">Italian
        </label>
      </div>



      <div class="form-control">
        <input value="japanese" id="check7" class="checkbox" type="checkbox" >
        <label for="check7"
          style="background:linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('./stylesheets/components/images/japanese.jpg'); background-position: center; background-size:cover;"
          class="input-name">Japanese
        </label>
      </div>



      <div class="form-control">
        <input value="mexican" id="check8" class="checkbox" type="checkbox" >
        <label for="check8"
          style="background:linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('./stylesheets/components/images/mexican.jpg'); background-position: center; background-size:cover;"
          class="input-name">Mexican
        </label>
      </div>



      <div class="form-control">
        <input value="middle-eastern" id="check9" class="checkbox" type="checkbox" >
        <label for="check9"
          style="background:linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('./stylesheets/components/images/middle-eastern.jpg'); background-position: center; background-size:cover;"
          class="input-name">Middle Eastern
        </label>
      </div>



      <div class="form-control">
        <input value="nordic" id="check10" class="checkbox" type="checkbox" >
        <label for="check10"
          style="background:linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('./stylesheets/components/images/nordic.jpg'); background-position: center; background-size:cover;"
          class="input-name">Nordic
        </label>
      </div>



      <div class="form-control">
        <input value="thai" id="check11" class="checkbox" type="checkbox" >
        <label for="check11"
          style="background:linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('./stylesheets/components/images/thai.jpg'); background-position: center; background-size:cover;"
          class="input-name">Thai
        </label>
      </div>



      <div class="form-control">
        <input value="korean" id="check12" class="checkbox" type="checkbox" >
        <label for="check12"
          style="background:linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('./stylesheets/components/images/Korean.jpg'); background-position: center; background-size:cover;"
          class="input-name">Korean
        </label>
      </div>
      </label>
    </div>
    <div class="btn-outer">
    <button id="btn-form-1" class="btn-primary">next</button>
      </div>
  </div>
    `

      document.querySelector(UISelectors.container).insertAdjacentHTML('afterbegin', html);

      UICtrl.animateCusineSection();

      document.querySelector(UISelectors.btnPrimary).addEventListener('click', () => {
        var checkboxes = document.querySelectorAll('input[type=checkbox]:checked')

        // Store all selected cuisines in the state array.
        console.log(checkboxes)
        for (let i = 0; i < checkboxes.length; i++) {
          state.selectedCuisines.push(checkboxes[i].value)
        }

        UICtrl.fadeOutCuisine();
        setTimeout(function () {
          document.querySelector(UISelectors.wrapContent).remove();
        }, 3000);

        setTimeout(function () {
          UICtrl.renderDietChoice();
        }, 3000);
      })
    },

    fadeOutCuisine: () => {
      let tl = new TimelineMax();

      tl.to(UISelectors.titleCuisine, 0.5, {
          opacity: 0,
          y: -20,
        })
        .staggerTo(UISelectors.inputName, 0.5, {
          opacity: 0,
          y: -10,
          stagger: 0.1,
        })
        .to(UISelectors.btnPrimary, 0.5, {
          opacity: 0,

        })
    },

    fadeinIngredientChoice: () => {
      let tl = new TimelineMax();

      tl.to(UISelectors.titleIngredient, 0.5, {
          opacity: 1,
          y: 0,
        })
        .to(UISelectors.queryInput, 0.5, {
          opacity: 1,
          y: 0,
        })
        .to(UISelectors.btnPrimary, 0.5, {
          opacity: 1,

        })
    },

    generalFadeIn: (title, input, button) => {
      let tl = new TimelineMax();

      tl.to(title, 0.5, {
          opacity: 1,
          y: 0,
        })
        .to(input, 0.5, {
          opacity: 1,
          y: 0,
        })
        .to(button, 0.5, {
          opacity: 1,

        })
    },


    generalFadeOut: (title, input, button) => {
      let tl = new TimelineMax();
      tl.to(title, 0.5, {
          opacity: 0,
          y: -20,
        })
        .to(input, 0.5, {
          opacity: 0,
          y: -20,
        })
        .to(button, 0.5, {
          opacity: 0,
        })
    },


    animateCusineSection: () => {
      let tl = new TimelineMax();
      tl.to(UISelectors.titleCuisine, 0.3, {
          opacity: 1,
          y: 0,

        })
        .staggerTo(UISelectors.formControl, 0.5, {
          stagger: 0.1,
          opacity: 1,
        })
        .to(UISelectors.btnPrimary, 0.3, {
          opacity: 1,
        })
    },

    bannerFadeOut: () => {
      let tl = new TimelineMax();
      console.log("trigger");
      tl.to(UISelectors.bannerTitle, 0.3, {
          y: '0px',
          opacity: 0,

        })
        .to(UISelectors.bannerParagraph, 0.3, {
          y: '0px',
          opacity: 0,

        })
        .to(UISelectors.btnBanner, 0.3, {
          opacity: 0,

        })
        .to(UISelectors.bannerMain, 0.3, {
          opacity: 0,
        })
    },

    animateBanner: () => {
      let tl1 = new TimelineMax();
      tl1.to(UISelectors.bannerMain, 0.5, {
          opacity: 1,
        })
        .to(UISelectors.bannerTitle, 0.5, {
          opacity: 1,
          y: 0,

        })
        .to(UISelectors.bannerParagraph, 0.5, {
          opacity: 1,
          y: 0,
        })
        .to(UISelectors.btnBanner, 0.5, {
          opacity: 1,

        })
        .to(UISelectors.bannerMain, 0.3, {})
    },

    getSelectors: () => {
      return UISelectors;
    }
  }
})();


const App = (function (ItemCtrl, UICtrl) {

  const UISelectors = UICtrl.getSelectors();

  const initAnimation = () => {
    UICtrl.animateBanner();
  }

  const loadEventListeners = () => {
    document.querySelector(UISelectors.btnPrimary).addEventListener('click', () => {
      console.log("trigger");
      setTimeout(() => {
        document.querySelector(UISelectors.wrapContent).remove();
      }, 1700);
      setTimeout(() => {
        UICtrl.renderIngredientChoice();
      }, 1700);
      UICtrl.bannerFadeOut();
    });
  }

  return {
    init: () => {
      UICtrl.animateBanner();
      loadEventListeners();
    }
  }
})(ItemCtrl, UICtrl);

App.init();




/* 667024
428687
570186
757883
988122 */