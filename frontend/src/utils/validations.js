// Form validations module.
// If a field is empty, don't allow the user to submit the form and return
// 'Required' indication text.
export const required = value => (value ? undefined : 'Required');
