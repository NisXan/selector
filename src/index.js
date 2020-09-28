import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import FRUIT from './fruit.json'

class Selector extends React.Component {
  constructor() {
    super();
    this.state = {
      options: [FRUIT],
      selectedOptions: [],
      newSelect: ''
    };
  }

  delete(key) {
    let ul = document.querySelector('.selector__options');
    let li = ul.getElementsByTagName('li');
    const selectedOptions = this.state.selectedOptions;
    const options = this.state.options;
    const filterArray = selectedOptions.filter(n => options.indexOf(n) === -1);
    if (filterArray.length > 0) {
      for (let i = 0; i < li.length; i++) {
        if (filterArray[key].id === li[i].getAttribute('data-id')) {
          li[i].classList.remove('selected');
          li[i].classList.remove('hidden');
          break;
        }
      }
    }
    const selectedOptionsActive = selectedOptions.splice(key, 1)
    this.setState({selectedOptions});
  }

  filterOptions() {
    let filter = document.querySelector('.selector__input').value;
    let filtered = filter.toUpperCase();
    let ul = document.querySelector('.selector__options');
    let li = ul.getElementsByTagName('li');

    const selectedOptions = this.state.selectedOptions;
    const options = this.state.options;
    const filterArray = selectedOptions.filter(n => options.indexOf(n) === -1);

    for (let i = 0; i < li.length; i++) {
      if (filter.length === 0) {
        li[i].classList.remove('hidden');
      }
      if ((li[i].textContent.toUpperCase().indexOf(filtered) > -1) && (!li[i].classList.contains('selected'))) {
          li[i].classList.remove('hidden');
      } else {
          li[i].classList.add('hidden');
      }
      if (filterArray.length > 0) {
        filterArray.map((options, i) => {
          if (options.name === li[i].textContent) {
            li[i].classList.add('hidden');
            li[i].classList.add('selected');
          }
        })
      }      
    }
  }

  render() {
    return( 
      <div 
        className="selector"
        onKeyDown={ev => {
          let ul = document.querySelector('.selector__options');
          let li = document.querySelector('.selector__options li:not(.hidden)');
          let liSelected = document.querySelector('.selector__options li.li-selected:not(.hidden)');
          let next;

          if(ev.keyCode === 40){ //arrow down 
            if(liSelected){
              let childPos = liSelected.offsetTop;
              ul.scrollTo(0,childPos + 17)             
              liSelected.classList.remove('li-selected');
              if (liSelected.nextSibling) {
                next = liSelected.nextSibling;
                while(next.classList.contains('hidden')) {
                  if (ul.lastChild === next) {
                    next = ul.firstChild;
                  }
                  next = next.nextSibling;
                }
              } else {
                next = ul.firstChild;
              }
              if(ul.firstChild !== next) {
                liSelected = next;
                liSelected.classList.add('li-selected');
              }else {
                liSelected = ul.firstChild;
                liSelected.classList.add('li-selected');
                next = ul.lastChild;
                let childPos = liSelected.offsetTop;
                ul.scrollTo(0,childPos)
              }
            }else{
              if (ul.firstChild.classList.contains('hidden')) {
                if (ul.firstChild.nextSibling.classList.contains('hidden')) {
                  next = ul.firstChild.nextSibling;
                  while(next.classList.contains('hidden')) {
                    next = next.nextSibling;
                  }
                  liSelected = next;
                  liSelected.classList.add('li-selected');
                } else {
                  liSelected = ul.firstChild.nextSibling;
                  liSelected.classList.add('li-selected');
                }
              } else {
                liSelected = ul.firstChild;
                liSelected.classList.add('li-selected');
              }
            }
        }else if(ev.keyCode === 38){ //arrow up 
          if(liSelected){
            let childPos = liSelected.offsetTop;
            ul.scrollTo(0,childPos - 17)
            liSelected.classList.remove('li-selected');
            if (liSelected.previousSibling) {
              next = liSelected.previousSibling;
              while(next.classList.contains('hidden')) {
                if (ul.firstChild === next) {
                  next = ul.lastChild;
                }
                next = next.previousSibling;
              }
            } else {
              next = ul.lastChild;
            }
            if(ul.lastElementChild !== next){
              liSelected = next;
              liSelected.classList.add('li-selected');
            }else{                
              liSelected = ul.lastChild;
              liSelected.classList.add('li-selected');
              next = ul.firstChild;
              let childPos = liSelected.offsetTop;
              ul.scrollTo(0,childPos)
            }
          }else{
            if (ul.lastChild.classList.contains('hidden')) {
              if (ul.firstChild.classList.contains('hidden')) {
                if (ul.firstChild.nextSibling.classList.contains('hidden')) {
                  next = ul.firstChild.nextSibling;
                  while(next.classList.contains('hidden')) {
                    next = next.nextSibling;
                  }
                  liSelected = next;
                  liSelected.classList.add('li-selected');
                } else {
                  liSelected = ul.firstChild.nextSibling;
                  liSelected.classList.add('li-selected');
                }
              } else {
                liSelected = ul.firstChild;
                liSelected.classList.add('li-selected');
              }
            } else {
              liSelected = ul.lastChild;
              liSelected.classList.add('li-selected');
            }
          }
        }else if (ev.keyCode === 13) {
          if(liSelected){
            this.state.selectedOptions.push({
              name: liSelected.textContent,
              id: liSelected.getAttribute('data-id')
            });
            this.setState({
              newSelect: ''
            });
            this.filterOptions();
            liSelected.classList.add('hidden');
            liSelected.classList.add('selected');
            liSelected.classList.remove('li-selected')
          }
        }}}>
        <div className="selector__container">
          {
            this.state.selectedOptions.map((options, i) => {
              return (
                <span 
                  key={i}
                  className="selector__active"
                  data-id={options.id}
                  >
                  {options.name}
                  <i className="selected__delete"
                    data-id={options.id}
                    onClick={this.delete.bind(this, i)}
                  >X</i>
                </span>
              )
            })
          }
          <input
            type="text"
            className="selector__input"
            value={this.state.newSelect}
            onClick={() => {
              document.querySelector('.selector__options').classList.remove('hidden')
            }}
            onBlur={() => {
              document.querySelector('body').addEventListener('click', ev => {
                if (ev.target !== document.querySelector('.selector__options')) {
                  document.querySelector('.selector__options').classList.add('hidden')
                }
              })
            }}
            onChange={ev => {              
              this.setState({ newSelect: ev.target.value});
              this.filterOptions()
            }}
            onKeyUp={ev => {
            if (ev.keyCode === 27) {
              document.querySelector('.selector__options').classList.add('hidden')
            }
          }}
          />
        </div>
        <ul
          className="selector__options hidden"
          onKeyUp={ev => {
            if (ev.keyCode === 27) {
              document.querySelector('.selector__options').classList.add('hidden')
            }
          }}>
          {
            this.state.options[0].map((option, i) => {
              return (
                <li 
                key={i}
                data-id={option.id}
                onClick={ev => {
                  this.state.selectedOptions.push({
                    name: ev.target.textContent,
                    id: ev.target.getAttribute('data-id')
                  })
                  this.setState({
                    newSelect: ''
                  })
                  this.filterOptions()
                  ev.target.classList.add('hidden')
                  ev.target.classList.add('selected')
                }}>
                {option.name}
                </li>
              )              
            })
          }
        </ul>
      </div>
    );
  }
}

ReactDOM.render(
  <Selector />,
  document.querySelector('#app')
);