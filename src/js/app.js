var app = (function ($, win, doc) {
  'use strict';

  function init() {
    var Title = React.createClass({
     render: function() {
       return (
         <h1>{this.props.text}</h1>
       );
     }
    });

    var Input = React.createClass({
      render: function() {
        return (
          <InputElement
            type='text'
            id={'input-' + this.props.name.toLowerCase()}
            name={'input-' + this.props.name.toLowerCase()}
            pattern='[0-9]{5}[\-]?[0-9]{3}'
            mask='99999-999'
            placeholder='00000-000' />
        );
      }
    });

    var Label = React.createClass({
      render: function() {
        return (
          <label htmlFor={'input-' + this.props.name.toLowerCase()}>
            {this.props.name}
            <Input name={this.props.name} />
          </label>
        );
      }
    });

    var Button = React.createClass({
      render: function() {
        return (
          <button type='submit'>{this.props.text}</button>
        );
      }
    });

    var SearchBar = React.createClass({
      render: function() {
        return (
          <header>
            <Title text={this.props.title} />
            <Label name={this.props.name} />
            <Button name={this.props.name} text={this.props.buttonText} />
          </header>
        );
      }
    });

    ReactDOM.render(
      <SearchBar name='CEP' title='Consultar' buttonText='Buscar' />,
      document.getElementById('zipcode')
    );
  };

  return {
    'init': init
  }

}(undefined, window, window.document)).init();
