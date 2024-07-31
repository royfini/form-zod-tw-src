import { Component, h, Element, State } from '@stencil/core/internal';
import { z } from 'zod';
import tailwind from '../../output.css';

@Component({
  tag: 'rf-form',
  shadow: true,
})
export class Form {
  @Element() element: HTMLElement;

  componentDidLoad() {
    const shadowRoot = this.element.shadowRoot;
    if (shadowRoot) {
      const style = document.createElement('style');
      style.textContent = tailwind;
      shadowRoot.appendChild(style);
    }
  }

  fnameInputEl: HTMLInputElement;
  lnameInputEl: HTMLInputElement;
  emailInputEl: HTMLInputElement;
  mobileInputEl: HTMLInputElement;
  ageInputEl: HTMLInputElement;

  @State() fnameInput: string;
  @State() lnameInput: string;
  @State() emailInput: string;
  @State() mobileInput: string;
  @State() ageInput: number;

  schema = z.object({
    fname: z.string().min(1, { message: 'First Name is required' }),
    lname: z.string().min(1, { message: 'Last Name is required' }),
    email: z.string().email({ message: 'Invalid email address' }),
    mobile: z.number().refine(value => /^\d{4,12}$/.test(value.toString()), {
      message: 'Invalid mobile number. It should be between 4 and 12 digits long.',
    }),
    age: z.number().min(18, { message: 'Must be at least 18 years old' }).max(99, { message: 'Must be less than 100 years old' }),
  });

  @State() fnameError = true;
  onInputFname(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    const name = z.string().min(1, { message: 'First Name is required' });
    const result = name.safeParse(value);
    //this.nameErrorMessage.textContent = result.success ? '' : result.error.errors[0].message;
    this.fnameError = !result.success;
    this.disableButton();
  }

  @State() lnameError = true;
  onInputLname(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    const name = z.string().min(1, { message: 'Last Name is required' });
    const result = name.safeParse(value);
    //this.nameErrorMessage.textContent = result.success ? '' : result.error.errors[0].message;
    this.lnameError = !result.success;
    this.disableButton();
  }

  @State() emailError = true;
  onInputEmail(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    const email = z.string().email({ message: 'Invalid email address' });
    const result = email.safeParse(value);
    //this.emailErrorMessage.textContent = result.success ? '' : result.error.errors[0].message;
    this.emailError = !result.success;
    this.disableButton();
  }

  @State() mobileError = true;
  onInputMobile(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    const mobile = z.number().refine(value => /^\d{4,12}$/.test(value.toString()), {
      message: 'Invalid mobile number. It should be between 4 and 12 digits long.',
    });
    const result = mobile.safeParse(Number(value));
    console.log(result);
    this.mobileError = !result.success;
    this.disableButton();
  }

  @State() ageError = true;
  onInputAge(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    const age = z.number().min(18, { message: 'Must be at least 18 years old' }).max(99, { message: 'Must be less than 100 years old' });
    const result = age.safeParse(Number(value));
    //this.ageErrorMessage.textContent = result.success ? '' : result.error.errors[0].message;
    this.ageError = !result.success;
    this.disableButton();
  }

  onSubmitForm(event: Event) {
    event.preventDefault();
    let fname = this.fnameInputEl.value;
    let lname = this.lnameInputEl.value;
    let email = this.emailInputEl.value;
    let mobile = Number(this.mobileInputEl.value);
    let age = Number(this.ageInputEl.value);
    let data = {
      fname,
      lname,
      email,
      mobile,
      age,
    };
    let result = this.schema.safeParse(data);
    if (result.success) {
      alert('Submit successful');
    } else {
      alert('Something went wrong');
    }
  }

  @State() disable = true;
  disableButton() {
    let fname = this.fnameInputEl.value;
    let lname = this.lnameInputEl.value;
    let email = this.emailInputEl.value;
    let mobile = Number(this.mobileInputEl.value);
    let age = Number(this.ageInputEl.value);
    let data = {
      fname,
      lname,
      email,
      mobile,
      age,
    };
    let result = this.schema.safeParse(data);
    if (result.success) {
      this.disable = false;
    } else {
      this.disable = true;
    }
  }

  render() {
    return (
      <div class="flex justify-center items-center">
        <form onSubmit={this.onSubmitForm.bind(this)} class="flex flex-col justify-center items-center border-2 border-black rounded-md p-12 mt-24">
          <div class="row">
            <div class="card">
              <input
                class={{ 'input-normal': true, 'input-error': this.fnameError }}
                type="text"
                onInput={this.onInputFname.bind(this)}
                value={this.fnameInput}
                ref={el => (this.fnameInputEl = el)}
              ></input>
              <label class={{ 'label-normal': true, 'label-error': this.fnameError }}>First name</label>
            </div>
            <div class="card">
              <input
                class={{ 'input-normal': true, 'input-error': this.lnameError }}
                type="text"
                onInput={this.onInputLname.bind(this)}
                value={this.lnameInput}
                ref={el => (this.lnameInputEl = el)}
              ></input>
              <label class={{ 'label-normal': true, 'label-error': this.lnameError }}>Last name</label>
            </div>
          </div>

          <div class="row">
            <div class="card">
              <input
                class={{ 'input-normal': true, 'input-error': this.emailError }}
                type="text"
                onInput={this.onInputEmail.bind(this)}
                value={this.emailInput}
                ref={el => (this.emailInputEl = el)}
              ></input>
              <label class={{ 'label-normal': true, 'label-error': this.emailError }}>Email</label>
            </div>
            <div class={{ 'flex': true, 'items-center': true, 'p-4': true, 'gap-3': true, 'input-normal': true, 'input-error': this.mobileError, 'card': true }}>
              <select class="w-1/4 outline-none">
                <option value="">+961</option>
                <option value="1">+456</option>
                <option value="2">+34</option>
                <option value="3">+2345</option>
              </select>
              <input type="text" class="w-3/4 outline-none" onInput={this.onInputMobile.bind(this)} value={this.mobileInput} ref={el => (this.mobileInputEl = el)} />
              <label class="label">Country</label>
              <label class={{ 'label-mobilenumber': true, 'label-mobilenumber-error': this.mobileError }}>Mobile number</label>
            </div>
          </div>

          <div class="row">
            <div class="card">
              <input
                class={{ 'input-normal': true, 'input-error': this.ageError }}
                type="number"
                onInput={this.onInputAge.bind(this)}
                value={this.ageInput}
                ref={el => (this.ageInputEl = el)}
              ></input>
              <label class={{ 'label-normal': true, 'label-error': this.ageError }}>Age</label>
            </div>
            <button class={{ 'btn': true, 'opacity-50': this.disable }} disabled={this.disable}>
              SUBMIT
            </button>
          </div>
        </form>
      </div>
    );
  }
}
