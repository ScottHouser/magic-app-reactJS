import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import axios from 'axios';

var configs = require('./config.js');
 
const cardSearchAuto = [];

//-----------------------------------------------------------------------------searchbar
//This search bar sends api to return atocomplete 
class Search extends React.Component {
    constructor(props) {
        super(props);
            this.state = {value: ''};

            this.handleChange = this.handleChange.bind(this);
        }
        
        componentDidMount() {
                      
        }

        handleChange(event) {

            this.setState({value: event.target.value});
                                
            var name = document.getElementById('asdf').value;
            axios.get('https://api.scryfall.com/cards/autocomplete?q='+name)
                .then(function (response) {

                    cardSearchAuto = response.data.data;
                                                                      
                    const listCards = cardSearchAuto.map((card) =><ul className='left_list'> < BigCard cards={card} / > </ul> );
                       
                    ReactDOM.render(listCards,document.getElementById('left_app_div'));
                     
                });

       }

       render() {
            return (
                < div className = 'input-group search_bar_div' >
                    < span className = "input-group-addon form_lables" id = "seach_span" ><strong> Search </strong>< /span>
                    < input className = 'form-control' id = 'asdf' onChange = {this.handleChange} >
                        {}
                    < /input>

                < /div>
            );
        }
    }

ReactDOM.render(< Search / > ,document.getElementById('container_div'));

//this component sends the text from the clicked link to an api to retrieve all information about that card
class BigCard extends React.Component {
  constructor(props) {
    super(props);
   
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    
    ReactDOM.render(<div></div>,document.getElementById('test_div'));
  
    axios.get('https://api.scryfall.com/cards/named?fuzzy=' + this.props.cards)
           .then(function (response) {
                                    
            document.getElementById('right_app_div').style.backgroundImage = "url("+response.data.image_uris.normal+")";
                                    
            
            var listRadio = [];
            var theSVG='';
                                    
                                    
            axios.get(response.data.prints_search_uri).then(function(response2){
             
                                       
                //listRadio = response2.data.data.map((card) => <CardSetDiv setsFull={card.set_name} sets={card.set.toUpperCase()}/ > );  
                theSVG = <SVGmaker setlist={response2.data.data}/>
                   
                ReactDOM.render(<BigModal svg={theSVG} listRadioStuff={listRadio} setlist={response2.data.data} name={response.data.name}/>,document.getElementById('test_div'));
           
                ReactDOM.render(<BigButton2 CardData={response.data}/>,document.getElementById('right_app_div'));
           
            });
         
 });
    
  }

  render() {
    return (
      <h5>
        <a onClick={this.handleClick}>
            {this.props.cards}
        </a>
      </h5>
    );
  }
}

//this button opens the modal
class BigButton2 extends React.Component {
  constructor(props) {
    super(props);
    //this.cardData=props.cardData;
    
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    
  }

  handleClick() {
 
  }
  handleChange() {
 
  }

  render() {
    return (
           <div id='sell_div'>
            <center>
                <button type="button" id="sell_button" className="btn btn-primary" data-toggle="modal" data-target="#myModal">
                    Create Listing
                </button>
            </center>
            </div>
    );
  }
}

//this button shortens the google url of the assigned input box
class BigButtonShortenURL extends React.Component {
  constructor(props) {
    super(props);
    
    
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    
  }

  handleClick() {
      
      var googURL = document.getElementById('modal_pic_url').value;
      
      //var params = {data: '{"longUrl":"'+googURL+'"}',contentType: 'application/json'};
      
      axios.post('https://www.googleapis.com/urlshortener/v1/url?key='+configs.default.googleApiAuth, 
      {"longUrl": googURL}).then(function (response) {
            
            document.getElementById('modal_pic_url').value=response.data.id;
        });
       
  }
  handleChange() {
 
  }

  render() {
    return (
          
        <button id='url_shortener' onClick={this.handleClick} type="button" className="btn btn-primary">
        Shorten Gooogle URL
        </button>

    );
  }
}

//This component handles all the sales form related code
class BigModal extends React.Component {
  constructor(props) {
    super(props);
 
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.quant='1';
    this.cardValue='';
    this.cardName=this.props.name;
    this.cardQuant='';
    this.cardPrice='';
    this.cardPic='';
    this.cardSet='';
    this.cardFoil=false;
    this.cardNM=false;
    this.cardFinal='';
    
    this.state = {value: '', name:this.props.name, quant:'', price:'',pic:'',set:'',foil:false,nm:false,final:''};
  
  }
  

  handleClick(e) {
      this.setState({pic:document.getElementById('modal_pic_url').value});
      this.formFinalString();
      
      if(e.target.id==='delete_modal'){
          ReactDOM.render(<div><center>Sale Aborted</center></div>,document.getElementById('test_div'));
      }
      if(e.target.id==='state_check'){
          console.log(this.state);
      }
     
      if(e.target.id==='sell_button2'){
          
          this.cardPic=document.getElementById('modal_pic_url').value;
          
          this.sellTheCard();
      }
  }
  
  
  getTheCheckedSetSVG(){
      var setsOnCard=document.getElementById("set_svg").childNodes;
      var selectedSet='';
      
      setsOnCard.forEach(function(element) {
        if(element.tagName==='g'){
            if(element.childNodes[0].getAttribute('class')==='selected'){
               
                
                selectedSet=element.childNodes[0].getAttribute('data-internalset');
                
            }else{
                
            }
 
        };
      });
      
     this.setState({set: selectedSet});
     this.cardSet=selectedSet; 
      
  }
//  
  handleChange(event) {
     
      this.setState({value: event.target.value});
      
      if(event.target.id==='modal_quant_div'){
          this.setState({quant: event.target.value});
          this.setState({name: this.props.name});
          this.cardQuant=event.target.value;
          
          
      }else if(event.target.id==='modal_name_div'){
          this.setState({name: event.target.value});
          
          
      }else if(event.target.id==='modal_price_div'){
          this.setState({price: event.target.value});
          this.cardPrice=event.target.value;
          
          
      }else if(event.target.id==='modal_pic_url'){
          this.setState({pic: event.target.value});
          this.cardPic=event.target.value;
          
      }else if(event.target.id==='foil_check'){         
          this.setState({foil: event.target.checked});
          this.cardFoil=event.target.checked;
      }
      else if(event.target.id==='nm_check'){
          this.setState({nm: event.target.checked});
          this.cardNM=event.target.checked;
      }
      
      else{
          
      }      
    
      //this.getTheCheckedSet();
      this.getTheCheckedSetSVG()
     
  }
  
  formFinalString(){
    this.getTheCheckedSetSVG()  
    this.setState({quant: document.getElementById('modal_quant_div').value});
    
    
      
    var cardName = this.state.name;
    var quantity = this.state.quant;
    var setName = this.state.set;
   
    var sets = [];
    var foil = this.state.foil ? 'FOIL' : '';
    var foil2 = this.cardFoil ? 'FOIL' : '';
    var condition = this.state.nm ? "NM" : '';
    var condition2 = this.cardNM ? "NM" : '';

    var outputString = cardName + " " + quantity +" "+ foil + " MTG Magic the Gathering\n" + setName + " " + " \n " + condition + " Free shipping!";
    var otherOutputString= this.cardName + " " + this.cardQuant +" "+ foil2 + " MTG Magic the Gathering " +this.cardSet +" /n "+condition2+" Free shipping!";
    
    this.cardFinal=otherOutputString;
    this.setState({final:outputString});
    
    //window.alert(otherOutputString);
      
  }
  

  sellTheCard() {
    //this will be working api
    var data=this.sell();  
   
    event.preventDefault();
    
    if(this.cardPrice==='' || this.cardPic==='' || this.cardSet==='' || this.cardPic===''){
       
        alert('missing information');
        return;
        
    }else{
        
    axios({
        method: 'post',
        url: 'https://api.ebay.com/ws/api.dll',
            headers:{
                'X-EBAY-API-COMPATIBILITY-LEVEL': '1019',
                'X-EBAY-API-CALL-NAME': 'AddItem',
                'X-EBAY-API-SITEID': '0',
                'X-EBAY-API-DETAIL-LEVEL': 0,
                'X-EBAY-API-IAF-TOKEN': configs.default.ebayAuth
            },
            data: data
            }).then(function(response){
             
                      console.log(response);                 
          
            });
    }
  }
  sell(){
      
      var makeEbayCallJson = function (title, description, startPrice, picURL, conditionId, CategoryId) {
        var ebayJson = '<?xml version="1.0" encoding="utf-8"?>' +
                '<AddItemRequest xmlns="urn:ebay:apis:eBLBaseComponents">' +
                '<RequesterCredentials>' +
                '<eBayAuthToken>' + configs.default.ebayAuth + '</eBayAuthToken>' +
                '</RequesterCredentials>' +
                '<ErrorLanguage>en_US</ErrorLanguage>' +
                '<WarningLevel>High</WarningLevel>' +
                '<Item>' +
                '<CategoryMappingAllowed>true</CategoryMappingAllowed>' +
                '<ConditionID>' + conditionId + '</ConditionID>' +
                '<Country>US</Country>' +
                '<Currency>USD</Currency>' +
                '<Description>' + description + '</Description>' +
                '<DispatchTimeMax>2</DispatchTimeMax>' +
                '<ListingDuration>Days_30</ListingDuration>' +
                '<ListingType>FixedPriceItem</ListingType>' +
                '<PaymentMethods>PayPal</PaymentMethods>' +
                '<PayPalEmailAddress>bulseye1111@gmail.com</PayPalEmailAddress>' +
                '<PictureDetails>' +
                '<PictureURL>' + picURL + '</PictureURL>' +
                '</PictureDetails>' +
                '<PostalCode>73013</PostalCode>' +
                '<PrimaryCategory>' +
                '<CategoryID>' + CategoryId + '</CategoryID>' +
                '</PrimaryCategory>' +
                '<Quantity>1</Quantity>' +
                '<ReturnPolicy>' +
                '<ReturnsAcceptedOption>ReturnsAccepted</ReturnsAcceptedOption>' +
                '<RefundOption>MoneyBack</RefundOption>' +
                '<ReturnsWithinOption>Days_30</ReturnsWithinOption>' +
                '<Description>If the card or cards are damaged or counterfeited, please message me or open a return through ebay and I will refund you as soon as possible.</Description>' +
                '<ShippingCostPaidByOption>Buyer</ShippingCostPaidByOption>' +
                '</ReturnPolicy>' +
                '<ShippingDetails>' +
                '<ShippingType>Flat</ShippingType>' +
                '<ShippingServiceOptions>' +
                '<FreeShipping>1</FreeShipping>' +
                '<ShippingService>ShippingMethodStandard</ShippingService>' +
                '</ShippingServiceOptions>' +
                '</ShippingDetails>' +
                '<Site>US</Site>' +
                '<StartPrice>' + startPrice + '</StartPrice>' +
                '<Title>' + title + '</Title>' +
                '</Item>' +
                '<Version>1019</Version>' +
                '</AddItemRequest>'


        return ebayJson;

    };
    
    var conditionId = this.cardNM ? 1000 : 3000;
    var categoryId = this.cardFoil ? 49181 : 38292;
    
    return makeEbayCallJson(this.cardFinal,this.cardFinal,this.cardPrice,this.cardPic,conditionId,categoryId);
      
  }
  
  
  render() {
    
    
    return (
        <div>
         
        
        <div className="input-group">
            <span className="input-group-addon form_lables" id="seach_span3"><strong>Name</strong></span>
            <input type="text" onChange={this.handleChange} value={this.props.name} className="form-control" id="modal_name_div" aria-describedby="basic-addon3">
            </input>
        </div>
        <div className="input-group">
            <span className="input-group-addon form_lables" id="seach_span4"><strong>Quantity</strong></span>
            <input type="text" onChange={this.handleChange}  className="form-control" id="modal_quant_div" aria-describedby="basic-addon3">
            </input>
        </div>
        <div className="input-group">
            <span className="input-group-addon form_lables" id="seach_span5"><strong>Price</strong></span>
            <input type="text" onChange={this.handleChange} className="form-control" id="modal_price_div" aria-describedby="basic-addon3">
            </input>
        </div>
        <div>
            <textarea onChange={this.handleChange} id='modal_pic_url' placeholder="pic url" className="form-control"></textarea>
            <center>
            <BigButtonShortenURL/>
            </center>
        </div>  

        <div id='check_box' className="form-check no_pad">
        <input onChange={this.handleChange}  type="checkbox" className="form-check-input no_pad" id="foil_check"></input>
        <label className="form-check-label" ><strong>Foil</strong></label>
        </div>

        <div id='check_box2' className="form-check no_pad">
        <input onChange={this.handleChange}  type="checkbox" className="form-check-input no_pad" id="nm_check"></input>
        <label className="form-check-label" ><strong>Near Mint</strong></label>
        </div>
        
        <div id='test_this_div' >
        <center>
        <h4 id='select_set_text'><strong>SELECT A SET</strong></h4>
        </center>
        <div id='test_wrap'>
        {this.props.svg}
        </div>
        </div>

        <div id='modal_foot_div' className="modal-footer">
        <div id='modal_foot_test_div'>
        
        <button onClick={this.handleClick} id='sell_button2' className="btn btn-primary">SELL!</button>
        
        <button onClick={this.handleClick} id='delete_modal' className="btn btn-danger">Delete and Close</button>
        
        </div>
      </div>
      <div>

      </div>
        </div>
        
    );
  }
}

//this component takes in sets and renders an svg button set
class SVGmaker extends React.Component {
  constructor(props) {
    super(props);
    this.svgClass='recto';
    this.svgHeight='twoRow'

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
    this.circs=this.giveMeMyCircles(this.props.setlist,this.handleClick,this.svgClass);
  }
  giveMeMyCircles(sets,clickFun,thisSvg){
      
      var circX=30;
      var circY=10;
      var theCircs=[];
      var theSvgSquares=[];
      
      
      if(sets.length<=4){
          this.svgHeight='oneRow'
      }else if(sets.length>4&&sets.length<=8){
          this.svgHeight='twoRow'
      }else if(sets.length>8&&sets.length<=12){
          this.svgHeight='threeRow'
      }else if(sets.length>12&&sets.length<=16){
          this.svgHeight='fourRow'
      }else if(sets.length>16&&sets.length<=20){
          this.svgHeight='fiveRow'
      }else{
          this.svgHeight='sixRow'
      }
      
      sets.forEach(function(set,i) {
         
         
          if(i%4!==0||i===0){
            circX=circX+70;
            circY=circY+0;
        }else{
           circX=circX-210;
            circY=circY+65; 
        }
        
              //make like other thing
              var circXstring=String(circX);
              var circYstring=String(circY);
              var textstartPointY=String(circY+30);
              var textstartPointX=String(circX+30);
              
              //var listSvg = <FixMyCircles sets={set} textstartPointX={textstartPointX} textstartPointY={textstartPointY} circXstring={circXstring} circYstring={circYstring}/ > ;  
              //theSvgSquares.push(listSvg);//useless?
              
              var addACirc=(
                      <g data-internalset={set.set.toUpperCase()} className='x' fill='url(#gradOne)'>
                <rect asdf='a' data-internalset={set.set.toUpperCase()+" "+set.set_name} data-internalset2={set.set_name} onClick={clickFun} id={'x'+i} className='unselected' width='60px' height='50px' filter="url(#f1)"  x={circXstring} y={circYstring} r="30" stroke="#6c93d1" rx="5" ry="5">
                </rect>
                <text x={textstartPointX} y={textstartPointY} textAnchor="middle" stroke="#4d979b" fill="#4d979b" strokeWidth="1px" >{set.set.toUpperCase()}</text>
  
                
                </g>
                );
            theCircs.push(addACirc);            
        
      });
      
      return(theCircs);
      
  }

  handleClick(e) {
      
      
      var theTargetElement=document.getElementById(e.target.id)
      
      var svg_child_elements=document.getElementById("set_svg").childNodes;
      
      
      svg_child_elements.forEach(function(element) {
        if(element.tagName==='g'){
            
            if(element.childNodes[0].id==theTargetElement.id){
               if(element.childNodes[0].getAttribute('class')==='unselected'){
                    element.childNodes[0].setAttribute("class", "selected");
                    
               }else{
                   element.childNodes[0].setAttribute("class", "unselected");
               }
            }else{
                element.childNodes[0].setAttribute("class", "unselected");
            }
        };
      });
      
  }
  
  consoleClick(e){
      
  }

  render() {
    return (
    <svg className={this.svgHeight} id='set_svg'>
      <defs>
                <linearGradient id="gradOne" x1="0%" y1="0%" x2="65%" y2="35%">
                    <stop stopColor="#b30000" stopOpacity="0.75" offset="0%">  </stop>
                    <stop stopColor="#b30000" stopOpacity="0.25" offset="100%">  </stop>
                </linearGradient>
                
                
                <filter id="f1" x="0" y="0" width="200%" height="200%">
                    <feOffset result="offOut" in="SourceAlpha" dx="10" dy="10"> </feOffset>
                    <feGaussianBlur result="blurOut" in="offOut" stdDeviation="10"> </feGaussianBlur>
                    <feBlend in="SourceGraphic" in2="blurOut" mode="normal"> </feBlend>
                </filter>
                                
       </defs>
                
                {this.circs}
    </svg>
    );
  }
}


