export default function createMarkUpMissingCocktails(wrapper) {
  let markUp = `<h2 class="cocktails-title--refusal">Sorry, we didn't find any cocktail for you</h2>
        <div class="cocktails-frame"></div>`;
  wrapper.insertAdjacentHTML('afterbegin', markUp);
}
