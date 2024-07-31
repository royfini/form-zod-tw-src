import { Component, h, Element, State } from '@stencil/core';
import tailwind from '../../output.css';
@Component({
  tag: 'rf-select-options',
  shadow: true,
})
export class SelectOption {
  @Element() element: HTMLElement;

  componentDidLoad() {
    const shadowRoot = this.element.shadowRoot;
    if (shadowRoot) {
      const style = document.createElement('style');
      style.textContent = tailwind;
      shadowRoot.appendChild(style);
    }
  }

  options = [
    { code: '+961', img: 'https://flagcdn.com/w320/lb.png' },
    { code: '+392', img: 'https://flagcdn.com/w320/it.png' },
    { code: '+1', img: 'https://flagcdn.com/w320/us.png' },
  ];

  @State() isOpen = false;
  setIsOpen() {
    this.isOpen = !this.isOpen;
  }

  @State() selectedOption = { code: '+961', img: 'https://flagcdn.com/w320/lb.png' };
  setSelectedOptions(value: { code: string; img: string }) {
    console.log(value);
    this.selectedOption = value;
    this.isOpen = false;
  }
  render() {
    let list = null;
    if (this.isOpen) {
      list = (
        <div class="absolute top-6 right-0 z-10 mt-4 w-20 origin-top-right rounded-md border border-gray-100 bg-white shadow-lg flex flex-col">
          {this.options.map(option => (
            <button type="button" class='w-full' onClick={this.setSelectedOptions.bind(this, option)}>
              <div class="w-full flex flex-row justify-between items-center rounded lg px-2 text-sm text-gray-500 no-underline hover:bg-gray-50">
                <div>{option.code}</div>
                <img src={option.img} class="w-5 h-4"></img>
              </div>
            </button>
          ))}
        </div>
      );
    }
    return (
      <div class="inline-flex m-32">
        <div class="relative inline-flex w-20 rounded-md bg-white">
          <div class="w-15 rounded-l-md px-4 py-2 flex flex-row justify-center items-center">
            <div>{this.selectedOption.code}</div>
            <img src={this.selectedOption.img} class="w-5 h-4"></img>
          </div>
          <div class="relative w-5">
            <button
              onClick={this.setIsOpen.bind(this)}
              type="button"
              class="inline-flex h-full items-center justify-center rounded-r-md border-1 border-gray-10 text-gray-600"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 h-10 w-3">
                <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>
            </button>
          </div>
          {list}
        </div>
      </div>
    );
  }
}
