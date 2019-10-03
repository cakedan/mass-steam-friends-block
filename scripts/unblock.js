(() => {
  const divs = document.getElementsByClassName('blocked_text');

  const checkboxes = [];
    for (let div of divs) {
      const checkbox = div.closest('.friend_block_v2').getElementsByClassName('selectable_overlay')[0];
      checkboxes.push(checkbox);
    }
    console.log(
      `Selected ${checkboxes.length} friends for to be unblocked.`,
    );
    for (let checkbox of checkboxes) {
      checkbox.click();
    }
})();
