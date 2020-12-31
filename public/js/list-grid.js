// Selector
const buttonFilter = document.querySelector('.btn_1.filter');
const buttonReset = document.querySelector('.btn_1.reset');
const filterContainer = document.querySelector('.filter_col');
const sortField = document.getElementById('sort');
const pagination = document.querySelector('.pagination');
const checkBoxs = document.querySelectorAll(`input[name=checkbox]`);

// Set state checkbox and sort if url has its query
document.addEventListener('DOMContentLoaded', (e) => {
  let params = new URLSearchParams(window.location.search);

  if (!params) return;

  // Set checkbox value if url has query checkbox
  checkBoxs.forEach((checkbox) => {
    const dataField = checkbox.getAttribute('data-field');
    const fieldValue = checkbox.value;

    if (params.get(dataField)) {
      const childQueryValue = params.get(dataField).split(',');
      if (params.has(dataField) && childQueryValue.includes(fieldValue)) {
        checkbox.checked = true;
      }
    }
  });

  if (params.has('sort')) {
    sortField.value = params.get('sort');
  }
});

// Build search params when Sort Field change
sortField.addEventListener('focus', (e) => {
  e.preventDefault();

  sortField.addEventListener('change', (eChange) => {
    eChange.preventDefault();

    let params = new URLSearchParams(window.location.search);
    params.set('sort', e.target.value);
    params.delete('page');

    window.location.href = `?${params}`;
  });
});

// Build search params when checkbox click
checkBoxs.forEach((checkbox) => {
  checkbox.addEventListener('change', (e) => {
    e.preventDefault();

    const checkedBrands = [].map
      .call(
        document.querySelectorAll(`input[data-field='brand']:checked`),
        (input) => input.value
      )
      .join(',');

    const checkedPrices = [].map
      .call(
        document.querySelectorAll(`input[data-field='price']:checked`),
        (input) => input.value
      )
      .join(',');

    let params = new URLSearchParams();

    if (checkedBrands) params.append('brand', checkedBrands);
    if (checkedPrices) params.append('price', checkedPrices);

    window.location.href = `?${params}`;
  });
});

// Build search params for paginate
if (pagination) {
  pagination.addEventListener('click', (e) => {
    e.preventDefault();

    let searchParams = new URLSearchParams(window.location.search.toString());
    searchParams.set('page', e.target.getAttribute('value'));

    window.location.href = `?${searchParams}`;
  });
}
