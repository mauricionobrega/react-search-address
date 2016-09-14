app.maps = (function ($, win, doc) {
  'use strict';

  var contentWrapper = doc.getElementById('content-wrapper');

  function addEvent(el, type, handler) {
    if (el.attachEvent) el.attachEvent('on'+type, handler); else el.addEventListener(type, handler);
  };

  function addClass(el, className) {
    if (el.classList) el.classList.add(className);
    else if (!hasClass(el, className)) el.className += ' ' + className;
  };

  function removeClass(el, className) {
    if (el.classList) el.classList.remove(className);
    else el.className = el.className.replace(new RegExp('\\b'+ className+'\\b', 'g'), '');
  };

  function make(address) {
    var fn = function(text) {return text.replace(/ /g, '+')};
    return fn(address.logradouro) + ',' + fn(address.localidade)
  };

  var InfoMap = React.createClass({
    render: function() {
      return (
        <div>
          <label className='street-name'>{this.props.logradouro}</label>
          <label>{this.props.bairro}</label>
          <label>{this.props.localidade + ' - ' + this.props.uf}</label>
          <label>{this.props.cep}</label>
        </div>
      );
    }
  });

  function draw(response) {
    if (response.erro) {
      return;
    };

    removeClass(contentWrapper, 'hide');

    ReactDOM.render(
      <InfoMap
        logradouro={response.logradouro}
        bairro={response.bairro}
        localidade={response.localidade}
        uf={response.uf}
        cep={response.cep} />,
      doc.getElementById('info')
    );

    var resultsMap = new google.maps.Map(doc.getElementById('map'), {
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
         <h2>{this.props.text}</h2>
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
          <button
            className='button'
            type='submit'
            onClick={this.handler}>{this.props.text}</button>
        );
      }
    });

    var SearchBar = React.createClass({
      render: function() {
        return (
          <div>
            <h1>{this.props.headingTitle}</h1>
            <div className='form'>
              <Title text={this.props.title} />
              <Label name={this.props.name} />
              <Button name={this.props.name} text={this.props.buttonText} />
            </div>
          </div>
        );
      }
    });

    ReactDOM.render(
      <SearchBar headingTitle="Consulta de Endereço" name='CEP' title='Consultar' buttonText='Buscar' />,
      doc.getElementById('search-bar')
    );

    addEvent(doc.getElementById('hide-wrapper'), 'click', function() {
      addClass(contentWrapper, 'hide');
    });
  };

  init();

}(undefined, window, window.document));
