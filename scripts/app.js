
const ItemCtrl = (function () {


  const state = {
    selectedCuisines: [],
  }

  return {
    getState: () => {
      return state
    }
  }


})();

const UICtrl = (function () {

  const UISelectors = {
    btnBanner: '#btn-banner',
    btnFormOne: '#btn-form-1',


    wrapContent: '.wrap-content',
  }


  const state = ItemCtrl.getState();


  return {


  renderDietChoice: () => {
    
  }

  renderCuisineChoice: () => {
    let html = `
    <div class="wrap-content">
    <h2 class="title">What type of
      food do you
      want to cook?</h2>

    <div class="group-form">

      <div class="form-control">
        <input value="american" id="check1" class="checkbox" type="checkbox" >
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
          style="background:linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('./stylesheets/components/images/italian.jpg'); background-position: center; background-size:cover;"
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
      <button id="btn-form-1" class="btn-primary">next</button>
    </div>
  </div>

    `

    document.querySelector('body').insertAdjacentHTML('afterbegin', html);

    document.querySelector(UISelectors.btnFormOne).addEventListener('click', () => {
      var checkboxes = document.querySelectorAll('input[type=checkbox]:checked')

      // Store all selected cuisines in the state array.
      console.log(checkboxes)
      for (let i = 0; i < checkboxes.length; i++) {
        state.selectedCuisines.push(checkboxes[i].value)
      }
      
      UICtrl.renderDietChoice();
     })
  },

   getSelectors: () => {
     return UISelectors;
   }
  }
})();


const App = (function (ItemCtrl, UICtrl) {

  const UISelectors = UICtrl.getSelectors();


  const loadEventListeners = () => {
    document.querySelector(UISelectors.btnBanner).addEventListener('click', () => {
      document.querySelector(UISelectors.wrapContent).remove();
      UICtrl.renderCuisineChoice();
    });
  }

  return {
    init: () => {
      loadEventListeners();
    }
  }
})(ItemCtrl, UICtrl);

App.init();
