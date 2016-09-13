app.maps = (function ($, win, doc) {
  'use strict';

  function make(address) {
    var fn = function(text) {return text.replace(/ /g, '+')};
    return fn(address.logradouro) + ',' + fn(address.localidade)
  };

  function draw(response) {
    var resultsMap = new google.maps.Map(document.getElementById('zipcode-map'), {
        zoom: 100,
        center: {lat: -34.397, lng: 150.644}
      }),
      geocoder = new google.maps.Geocoder(),
      address = make(response);
    geocoder.geocode({'address': address}, function(results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        resultsMap.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
          map: resultsMap,
          position: results[0].geometry.location
        });
      } else {
        console.log('Geocode was not successful for the following reason: ' + status);
      }
    });
  };

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
      handler: function() {
        var id = 'input-' + this.props.name.toLowerCase(),
            zipcode = doc.getElementById(id).value.replace(/\D/g, '')
        reqwest({
          url: 'https://viacep.com.br/ws/'+zipcode+'/json/?callback=?',
          type: 'jsonp',
          success: draw
        });
      },
      render: function() {
        return (
          <button type='submit' onClick={this.handler}>{this.props.text}</button>
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

  init();

  return {
    'draw': draw
  }

}(undefined, window, window.document));
