import React from 'react';
        import ReactDOM from 'react-dom';
        import App from './App';
        import './index.css';
        import axios from 'axios';


        const test = < h1 > test < /h1>;
        const cardSearchAuto = [];




//ReactDOM.render(<BigButton2 CardData={response.data}/>,document.getElementById('right_app_div'));
//this worked
        function CardsList(props) {
        const cards = props.cards;
                const listItems = cards.map((card) =>
                       < li > 
                            <a >
                            {card} 
                            </a>
                        < /li>
                        );
                return (
                        < ul > {listItems} < /ul>
                        );
                };
                
                

//-----------------------------------------------------------------------------searchbar
                        class Search extends React.Component {
                        constructor(props) {
                        super(props);
                                this.state = {value: ''};
                                //this.state = {isToggleOn: true};


                                this.handleChange = this.handleChange.bind(this);
                                }
                        componentDidMount() {
                      
                                }

                        handleChange(event) {
//this.setState({value: event.target.value});
                        this.setState({value: event.target.value});
                                //test= <h1>{document.getElementById('asdf').value}</h1>;
                                var name = document.getElementById('asdf').value;
                                axios.get('https://api.scryfall.com/cards/autocomplete?q='+name)
                                .then(function (response) {


//                ReactDOM.render(
//                        < App / > ,
//                        document.getElementById('root')
//                        );
                                cardSearchAuto = response.data.data;
                                
                                        //const listCards = cardSearchAuto.map((card) => <li> {card} </li> );
                                        const listCards = cardSearchAuto.map((card) =><ul className='left_list'> < BigCard cards={card} / > </ul> );
                                        
                                        



                                        
                                        ReactDOM.render(
                                                listCards,
                                                document.getElementById('left_app_div')
                                                );
                                        //ReactDOM.render(listCards, document.getElementById('left_app_div'))
                                        

                                });



                                }

                        render() {
                        return (
                                < div className = 'input-group search_bar_div' >
                                < span className = "input-group-addon" id = "seach_span" > Search < /span>
                                < input className = 'form-control' id = 'asdf' onChange = {this.handleChange} >
                        {}
                        < /input>

                                < /div>
                                );
                                }
                        }

                ReactDOM.render(
                        < Search / > ,
                        document.getElementById('container_div')
                        );

class BigCard extends React.Component {
  constructor(props) {
    super(props);
    //this.cards=props.cards;
    //this.state = {isToggleOn: true};

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    
    
  
    axios.get('https://api.scryfall.com/cards/named?fuzzy=' + this.props.cards)
           .then(function (response) {
                                    
            document.getElementById('right_app_div').style.backgroundImage = "url("+response.data.image_uris.normal+")";
                                    
            
            var listRadio = [];
            var theSVG='';
                                    
                                    
           axios.get(response.data.prints_search_uri).then(function(response2){
             
                                       
           listRadio = response2.data.data.map((card) => <CardSetDiv setsFull={card.set_name} sets={card.set.toUpperCase()}/ > );  
           theSVG = <SVGmaker setlist={response2.data.data}/>
                   
           ReactDOM.render(<InputNameDiv svg={theSVG} listRadioStuff={listRadio} setlist={response2.data.data} name={response.data.name}/>,document.getElementById('test_div'));
           
           ReactDOM.render(<BigButton2 CardData={response.data}/>,document.getElementById('right_app_div'));
           //ReactDOM.render(<BigButtonSubmit CardData={response.data}/>,document.getElementById('submit_button_div'));
           //listRadio = response2.data.data.map((card) => < CardSetDiv sets={card.set}/ > );
           //ReactDOM.render(listRadio,document.getElementById('radio_button_div'));
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


class BigButtonShortenURL extends React.Component {
  constructor(props) {
    super(props);
    
    
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    
  }

  handleClick() {
      
      var googURL = document.getElementById('modal_pic_url').value;
      
      //var params = {data: '{"longUrl":"'+googURL+'"}',contentType: 'application/json'};
      
      axios.post('https://www.googleapis.com/urlshortener/v1/url?key=AIzaSyCVHqmoP280py605KPBGz2PGbeRpf8Tmjs', 
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


//could probably delete this
class CardSetDiv extends React.Component {
  constructor(props) {
    super(props);
    
    this.buttonClass="btn btn-danger";
    this.divClass="setDiv col-sm-4";
    
    
    this.state = {isToggleOn: true};
    
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    
  }

  handleClick() {
      
      this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
       
    if(this.buttonClass==="btn btn-danger"){
        this.buttonClass="btn btn-success";
        this.divClass="setDiv2 col-sm-4";
    }else{
        this.buttonClass="btn btn-danger";
        this.divClass="setDiv col-sm-4";
    }
           
  }
  handleChange() {
      
  }

  render() {
    return (
       <div className={this.divClass}>
       <button data-internalset={this.props.setsFull} className={this.buttonClass} onClick={this.handleClick}>
        {this.state.isToggleOn ? 'X' : '------------->'}
      </button>
      
      {this.props.sets}
      
      
        </div>
    );
  }
}

class InputNameDiv extends React.Component {
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
   
    this.circs2=this.giveMeMyFuckingCircles(this.props.setlist);
        
    
   
    
  }
  //I dont think I jsue this
  giveMeMyFuckingCircles(sets){
      var circX=0;
      var circY=40;
      var theCircs=[]
      
      sets.forEach(function(set,i) {
          if(i%4!==0||i===0){
            circX=circX+70;
            circY=circY+0;
        }else{
           circX=circX-210;
            circY=circY+65; 
        }  
        
              var circXstring=String(circX);
              var circYstring=String(circY);
              var textstartPointY=String(circY+30);
              var textstartPointX=String(circX+30);
              var addACirc=(
                      <g>
                <rect width='60px' height='50px' filter="url(#f1)" fill="#6ad5e8" x={circXstring} y={circYstring} r="30" stroke="#6c93d1" strokeWidth="0">
                </rect>
                <text x={textstartPointX} y={textstartPointY} textAnchor="middle" stroke="#111111" strokeWidth="2px" >{set.set.toUpperCase()}</text>
  
                
                </g>
                );
            theCircs.push(addACirc);
            
            
            
      });
      
      return(theCircs);
  }

  handleClick(e) {
      this.setState({pic:document.getElementById('modal_pic_url').value});
      this.formFinalString();
      
      if(e.target.id==='delete_modal'){
          ReactDOM.render(<div></div>,document.getElementById('test_div'));
      }
      if(e.target.id==='state_check'){
          console.log(this.state);
      }
     //this code is basis for sell api 
      //console.log(this.sell2());
//      var data=this.sell2();
//      
//       axios.post('https://api.ebay.com/ws/api.dll',
//     {
//        headers:{
//                'X-EBAY-API-COMPATIBILITY-LEVEL': '1019',
//                'X-EBAY-API-CALL-NAME': 'AddItem',
//                'X-EBAY-API-SITEID': '0',
//                'X-EBAY-API-DETAIL-LEVEL': 0,
//                'X-EBAY-API-IAF-TOKEN':'AgAAAA**AQAAAA**aAAAAA**Y5ExWg**nY+sHZ2PrBmdj6wVnY+sEZ2PrA2dj6AFmYqoC5mAow+dj6x9nY+seQ**4f4DAA**AAMAAA**aloOJiTqs+eJfiI0TmWCHXLFsfPkd0eRThFQ+f+Fjj+6oLDl6m3B/3IlwjX0+/1nHJu4HnwVwWS3pmlusXMY4Dwq4VoBGAzFar42TFSCMZcR/TrD3h8fzMOL2EQCDyqGHnhzoHQoMptrY4h2mDhokOxG49k6VbtHCu6VVElyYIBrmxamcCQsA4YSNbLX65rTm1KSEs73euaDsnN6rBGnsk3mLU71VZ+gCuaOsGsP4mloK8VYiDhoq0ealgeBZyVgUjFXma924oAdx+yNtEp0KtaJAy18NDZ8jqLLucGNKtUGLzcw+Ibu3e5qFKeoawH0ab0Qw7JzKSRlHR4PNHQwIdmzVY3EN9ffMPlcjAmBvY31qPGYR4Ssj5IcfplIRqjUdhaamSJCebSCT/AUMOOj6dTlVh1nHrlMiqL/hzUu3apCafJ9oJme0yX9o00wtGgvIUO8kJeHPbi9TQOsQS0bsNV0ZWbPPBTVGMgAtepdAtRtQfdjLRBTCzKFFFa1jDNC1i6F8Vec3/ne5muNzhNPC2QWP580TRAIsDoExeIIpwcJFeWXEIafBzAsJjpObST47yqk7Xy5dlAHnS90zwOB+2QZpRKPl05CSkO/+JXkgz5Jsnlc3gNaxZvYFB3rynClBtInp9G+H8tXeQWjH5v5IE/U8d0eUdN9lhjDg4795teB+8PNc0jvIIyJ8xpAV8Q8jjcNf2IByQX3iNQj5/XdeHgxdDdsb0zmfNmQAPwlXkp0J8ze92/GB6BBp1iTMoBx'
//        }
//     },{
//         data: data.xml 
//      }).then(function(response){
//             
//                      console.log(response);                 
//          
//        });
      
      //ReactDOM.render(<div></div>,document.getElementById('test_div'));
     
      
           
  }
  //is this useless now?
  getTheCheckedSet(){
      var setsOnCard=document.getElementById("test_wrap").childNodes;
      var setsOnCardNames=[]
      var setsOnCardSelected=[]
 
            try {
                    setsOnCard.forEach(function(element) {
                    
                    setsOnCardNames.push([element.innerText,element.childNodes[0].dataset.internalset]);
                });
            }
            catch (err) {
                
            }
 

            try {
                setsOnCardNames.forEach(function(element) {
                if (element[0].substring(0, 3) === '---'){
                setsOnCardSelected.push(element); }
            else{

            }
        });
      }
      catch(err) {
               
    }
      
    var currentSetTitle=(setsOnCardSelected[0][0].substring(setsOnCardSelected[0][0].length-3,setsOnCardSelected[0][0].length)+" "+setsOnCardSelected[0][1]);
    
                
    try{
      this.setState({set:currentSetTitle});
    }catch(err){
            
    }
      
  }
  getTheCheckedSetSVG(){
      var setsOnCard=document.getElementById("set_svg").childNodes;
      var selectedSet='';
      
      setsOnCard.forEach(function(element) {
        if(element.tagName==='g'){
            if(element.childNodes[0].getAttribute('class')==='selected'){
               
                console.log(element.childNodes[0].getAttribute('data-internalset'));
                selectedSet=element.childNodes[0].getAttribute('data-internalset');
                
            }else{
                
            }
            
           
        };
      });
      
     this.setState({set: selectedSet});
      
      
  }
//  
  handleChange(event) {
      //this.state.value= document.getElementById('modal_discription_div').value;
      //this.final=document.getElementById('modal_discription_div').value +this.props.name;
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
          console.log(this.cardPrice);
          
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
      
      
     //console.log(this.sell2());       
     
      
  }
  
  formFinalString(){
    this.getTheCheckedSetSVG()  
    this.setState({quant: document.getElementById('modal_quant_div').value});
    
    
      
    var cardName = this.state.name;
    var quantity = this.state.quant;
    var setName = this.state.set;
   
    var sets = [];
    var foil = this.state.foil ? 'FOIL' : '';
    var condition = this.state.nm ? "NM" : '';

    //var checkedSet = ($("#set_radio_form input[type='radio']:checked"));

    //setName = checkedSet[0].getAttribute('datasetname');
    //setAbr = checkedSet[0].getAttribute('datasetabr');

    var outputString = cardName + " " + quantity +" "+ foil + " MTG Magic the Gathering\n" + setName + " " + " \n " + condition + " Free shipping!";
    
    this.setState({final:outputString});
    
    window.alert(outputString);
      
  }
  handleSubmit(event) {
    console.log(this.sell2());
    var data='';  
    alert(this.state);
    event.preventDefault();
    
    
     axios.post('https://api.ebay.com/ws/api.dll',
     {
        headers:{
                'X-EBAY-API-COMPATIBILITY-LEVEL': '1019',
                'X-EBAY-API-CALL-NAME': 'AddItem',
                'X-EBAY-API-SITEID': '0',
                'X-EBAY-API-DETAIL-LEVEL': 0,
                'X-EBAY-API-IAF-TOKEN':'AgAAAA**AQAAAA**aAAAAA**Y5ExWg**nY+sHZ2PrBmdj6wVnY+sEZ2PrA2dj6AFmYqoC5mAow+dj6x9nY+seQ**4f4DAA**AAMAAA**aloOJiTqs+eJfiI0TmWCHXLFsfPkd0eRThFQ+f+Fjj+6oLDl6m3B/3IlwjX0+/1nHJu4HnwVwWS3pmlusXMY4Dwq4VoBGAzFar42TFSCMZcR/TrD3h8fzMOL2EQCDyqGHnhzoHQoMptrY4h2mDhokOxG49k6VbtHCu6VVElyYIBrmxamcCQsA4YSNbLX65rTm1KSEs73euaDsnN6rBGnsk3mLU71VZ+gCuaOsGsP4mloK8VYiDhoq0ealgeBZyVgUjFXma924oAdx+yNtEp0KtaJAy18NDZ8jqLLucGNKtUGLzcw+Ibu3e5qFKeoawH0ab0Qw7JzKSRlHR4PNHQwIdmzVY3EN9ffMPlcjAmBvY31qPGYR4Ssj5IcfplIRqjUdhaamSJCebSCT/AUMOOj6dTlVh1nHrlMiqL/hzUu3apCafJ9oJme0yX9o00wtGgvIUO8kJeHPbi9TQOsQS0bsNV0ZWbPPBTVGMgAtepdAtRtQfdjLRBTCzKFFFa1jDNC1i6F8Vec3/ne5muNzhNPC2QWP580TRAIsDoExeIIpwcJFeWXEIafBzAsJjpObST47yqk7Xy5dlAHnS90zwOB+2QZpRKPl05CSkO/+JXkgz5Jsnlc3gNaxZvYFB3rynClBtInp9G+H8tXeQWjH5v5IE/U8d0eUdN9lhjDg4795teB+8PNc0jvIIyJ8xpAV8Q8jjcNf2IByQX3iNQj5/XdeHgxdDdsb0zmfNmQAPwlXkp0J8ze92/GB6BBp1iTMoBx'
        }
     },{
         data: data.xml 
      }).then(function(response){
             
                      console.log(response);                 
          
        });
    
  }
  sell(){
      
      var makeEbayCallJson = function (title, description, startPrice, picURL, conditionId, CategoryId) {
        var ebayJson = '<?xml version="1.0" encoding="utf-8"?>' +
                '<AddItemRequest xmlns="urn:ebay:apis:eBLBaseComponents">' +
                '<RequesterCredentials>' +
                '<eBayAuthToken>x</eBayAuthToken>' +
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
    
    return makeEbayCallJson(this.state.final,this.state.final,this.state.price,this.state.pic,'1111','1111');
      
  }
  sell2(){
      
      var makeEbayCallJson2 = function () {
        var ebayJson2= '<?xml version="1.0" encoding="utf-8"?>' +
                '<AddItemRequest xmlns="urn:ebay:apis:eBLBaseComponents">' +
                '<RequesterCredentials>' +
                '<eBayAuthToken>AgAAAA**AQAAAA**aAAAAA**Y5ExWg**nY+sHZ2PrBmdj6wVnY+sEZ2PrA2dj6AFmYqoC5mAow+dj6x9nY+seQ**4f4DAA**AAMAAA**aloOJiTqs+eJfiI0TmWCHXLFsfPkd0eRThFQ+f+Fjj+6oLDl6m3B/3IlwjX0+/1nHJu4HnwVwWS3pmlusXMY4Dwq4VoBGAzFar42TFSCMZcR/TrD3h8fzMOL2EQCDyqGHnhzoHQoMptrY4h2mDhokOxG49k6VbtHCu6VVElyYIBrmxamcCQsA4YSNbLX65rTm1KSEs73euaDsnN6rBGnsk3mLU71VZ+gCuaOsGsP4mloK8VYiDhoq0ealgeBZyVgUjFXma924oAdx+yNtEp0KtaJAy18NDZ8jqLLucGNKtUGLzcw+Ibu3e5qFKeoawH0ab0Qw7JzKSRlHR4PNHQwIdmzVY3EN9ffMPlcjAmBvY31qPGYR4Ssj5IcfplIRqjUdhaamSJCebSCT/AUMOOj6dTlVh1nHrlMiqL/hzUu3apCafJ9oJme0yX9o00wtGgvIUO8kJeHPbi9TQOsQS0bsNV0ZWbPPBTVGMgAtepdAtRtQfdjLRBTCzKFFFa1jDNC1i6F8Vec3/ne5muNzhNPC2QWP580TRAIsDoExeIIpwcJFeWXEIafBzAsJjpObST47yqk7Xy5dlAHnS90zwOB+2QZpRKPl05CSkO/+JXkgz5Jsnlc3gNaxZvYFB3rynClBtInp9G+H8tXeQWjH5v5IE/U8d0eUdN9lhjDg4795teB+8PNc0jvIIyJ8xpAV8Q8jjcNf2IByQX3iNQj5/XdeHgxdDdsb0zmfNmQAPwlXkp0J8ze92/GB6BBp1iTMoBx</eBayAuthToken>' +
                '</RequesterCredentials>' +
                '<ErrorLanguage>en_US</ErrorLanguage>' +
                '<WarningLevel>High</WarningLevel>' +
                '<Item>' +
                '<CategoryMappingAllowed>true</CategoryMappingAllowed>' +
                '<ConditionID>' + '1111' + '</ConditionID>' +
                '<Country>US</Country>' +
                '<Currency>USD</Currency>' +
                '<Description>' + 'card description' + '</Description>' +
                '<DispatchTimeMax>2</DispatchTimeMax>' +
                '<ListingDuration>Days_30</ListingDuration>' +
                '<ListingType>FixedPriceItem</ListingType>' +
                '<PaymentMethods>PayPal</PaymentMethods>' +
                '<PayPalEmailAddress>bulseye1111@gmail.com</PayPalEmailAddress>' +
                '<PictureDetails>' +
                '<PictureURL>' + 'https://goo.gl/ZH3Fn6' + '</PictureURL>' +
                '</PictureDetails>' +
                '<PostalCode>73013</PostalCode>' +
                '<PrimaryCategory>' +
                '<CategoryID>' + '1111' + '</CategoryID>' +
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
                '<StartPrice>' + '20' + '</StartPrice>' +
                '<Title>' + 'this is the title' + '</Title>' +
                '</Item>' +
                '<Version>1019</Version>' +
                '</AddItemRequest>'


        return ebayJson2;

    };
    
    return makeEbayCallJson2();
      
  }
  

  render() {
    
    
    return (
        <div>
         <div id='test_this_div' >
        <center>
        <h4 id='select_set_text'>SELECT A SET</h4>
        </center>
        <div id='test_wrap'>
        {this.props.svg}
        </div>
        </div>
        
        <div className="input-group">
            <span className="input-group-addon form_lables" id="seach_span3">Name</span>
            <input type="text" onChange={this.handleChange} value={this.props.name} className="form-control" id="modal_name_div" aria-describedby="basic-addon3">
            </input>
        </div>
        <div className="input-group">
            <span className="input-group-addon form_lables" id="seach_span4">Quantity</span>
            <input type="text" onChange={this.handleChange}  className="form-control" id="modal_quant_div" aria-describedby="basic-addon3">
            </input>
        </div>
        <div className="input-group">
            <span className="input-group-addon form_lables" id="seach_span5">Price</span>
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
        <label className="form-check-label" >Foil</label>
        </div>

        <div id='check_box2' className="form-check no_pad">
        <input onChange={this.handleChange}  type="checkbox" className="form-check-input no_pad" id="nm_check"></input>
        <label className="form-check-label" >Near Mint</label>
        </div>

        
        

        
        <div id='modal_foot_div' className="modal-footer">
        <div id='modal_foot_test_div'>
        
        
        <button onClick={this.handleClick} className="btn btn-success">SELL!</button>
        <button onClick={this.handleClick} id='test_sell' className="btn btn-success">deletet</button>
        <button onClick={this.handleClick} id='delete_modal' className="btn btn-danger">asdf</button>
        <button onClick={this.handleClick} id='state_check' className="btn btn-danger">check state</button>
        </div>
      </div>
      <div>
      


      </div>
        </div>
        
    );
  }
}


class SVGmaker extends React.Component {
  constructor(props) {
    super(props);
    this.svgClass='recto';
    this.svgHeight='twoRow'

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
    this.circs=this.giveMeMyFuckingCircles(this.props.setlist,this.handleClick,this.svgClass);
  }
  giveMeMyFuckingCircles(sets,clickFun,thisSvg){
      
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
         console.log(set.set.toUpperCase()+" "+set.set_name);
         
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
              
              var listSvg = <FixMyCircles sets={set} textstartPointX={textstartPointX} textstartPointY={textstartPointY} circXstring={circXstring} circYstring={circYstring}/ > ;  
              theSvgSquares.push(listSvg);//useless?
              
              var addACirc=(
                      <g data-internalset={set.set.toUpperCase()} className='x'>
                <rect asdf='a' data-internalset={set.set.toUpperCase()+" "+set.set_name} data-internalset2={set.set_name} onClick={clickFun} id={'x'+i} className='unselected' width='60px' height='50px' filter="url(#f1)" fill="#6ad5e8" x={circXstring} y={circYstring} r="30" stroke="#6c93d1" rx="5" ry="5">
                </rect>
                <text x={textstartPointX} y={textstartPointY} textAnchor="middle" stroke="#4d979b" fill="#4d979b" strokeWidth="1px" >{set.set.toUpperCase()}</text>
  
                
                </g>
                );
            theCircs.push(addACirc);
            
            theSvgSquares.push(listSvg);//useless?
           
            
            
      });
      
      return(theCircs);
      //return();
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
                
            }
        };
      });
      
      

  }
  
  consoleClick(e){
      
  }

  render() {
    return (
     <svg class={this.svgHeight} id='set_svg'>
      <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="65%" y2="35%">
                <stop> offset="0%" style="stop-color:rgb(50,50,50);stop-opacity:1" </stop>
                <stop> offset="100%" style="stop-color:rgb(100,100,100);stop-opacity:1" </stop>
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


//useless?
class FixMyCircles extends React.Component {
  constructor(props) {
    super(props);
    
    
    this.state = {isToggleOn: true};
    
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    
  }

  handleClick() {
      
      this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
       
//    if(this.buttonClass==="btn btn-danger"){
//        this.buttonClass="btn btn-success";
//        this.divClass="setDiv2 col-sm-4";
//    }else{
//        this.buttonClass="btn btn-danger";
//        this.divClass="setDiv col-sm-4";
//    }
           
  }
  handleChange() {
      
  }

  render() {
    return (
       <g>
            <rect onClick={this.handleClick()} className='recto' width='60px' height='50px' filter="url(#f1)" fill="#6ad5e8" x={this.props.circXstring} y={this.props.circYstring} r="30" stroke="#6c93d1" rx="5" ry="5">
            </rect>
            <text x={this.props.textstartPointX} y={this.props.textstartPointY} textAnchor="middle" stroke="#111111" strokeWidth="2px" ></text>
  
                
       </g>
    );
  }
}
//--------------------------------------------------------------for testing the api
class TestApi extends React.Component {
  constructor(props) {
    super(props);
    
    this.asdf='asdfd'
    this.state = {isToggleOn: true};
    
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    
  }
   sell2(){
      
      var makeEbayCallJson2 = function () {
        var ebayJson2= '<?xml version="1.0" encoding="utf-8"?>' +
                '<AddItemRequest xmlns="urn:ebay:apis:eBLBaseComponents">' +
                '<RequesterCredentials>' +
                '<eBayAuthToken>AgAAAA**AQAAAA**aAAAAA**Y5ExWg**nY+sHZ2PrBmdj6wVnY+sEZ2PrA2dj6AFmYqoC5mAow+dj6x9nY+seQ**4f4DAA**AAMAAA**aloOJiTqs+eJfiI0TmWCHXLFsfPkd0eRThFQ+f+Fjj+6oLDl6m3B/3IlwjX0+/1nHJu4HnwVwWS3pmlusXMY4Dwq4VoBGAzFar42TFSCMZcR/TrD3h8fzMOL2EQCDyqGHnhzoHQoMptrY4h2mDhokOxG49k6VbtHCu6VVElyYIBrmxamcCQsA4YSNbLX65rTm1KSEs73euaDsnN6rBGnsk3mLU71VZ+gCuaOsGsP4mloK8VYiDhoq0ealgeBZyVgUjFXma924oAdx+yNtEp0KtaJAy18NDZ8jqLLucGNKtUGLzcw+Ibu3e5qFKeoawH0ab0Qw7JzKSRlHR4PNHQwIdmzVY3EN9ffMPlcjAmBvY31qPGYR4Ssj5IcfplIRqjUdhaamSJCebSCT/AUMOOj6dTlVh1nHrlMiqL/hzUu3apCafJ9oJme0yX9o00wtGgvIUO8kJeHPbi9TQOsQS0bsNV0ZWbPPBTVGMgAtepdAtRtQfdjLRBTCzKFFFa1jDNC1i6F8Vec3/ne5muNzhNPC2QWP580TRAIsDoExeIIpwcJFeWXEIafBzAsJjpObST47yqk7Xy5dlAHnS90zwOB+2QZpRKPl05CSkO/+JXkgz5Jsnlc3gNaxZvYFB3rynClBtInp9G+H8tXeQWjH5v5IE/U8d0eUdN9lhjDg4795teB+8PNc0jvIIyJ8xpAV8Q8jjcNf2IByQX3iNQj5/XdeHgxdDdsb0zmfNmQAPwlXkp0J8ze92/GB6BBp1iTMoBx</eBayAuthToken>' +
                '</RequesterCredentials>' +
                '<ErrorLanguage>en_US</ErrorLanguage>' +
                '<WarningLevel>High</WarningLevel>' +
                '<Item>' +
                '<CategoryMappingAllowed>true</CategoryMappingAllowed>' +
                '<ConditionID>' + '1111' + '</ConditionID>' +
                '<Country>US</Country>' +
                '<Currency>USD</Currency>' +
                '<Description>' + 'card description' + '</Description>' +
                '<DispatchTimeMax>2</DispatchTimeMax>' +
                '<ListingDuration>Days_30</ListingDuration>' +
                '<ListingType>FixedPriceItem</ListingType>' +
                '<PaymentMethods>PayPal</PaymentMethods>' +
                '<PayPalEmailAddress>bulseye1111@gmail.com</PayPalEmailAddress>' +
                '<PictureDetails>' +
                '<PictureURL>' + 'https://goo.gl/ZH3Fn6' + '</PictureURL>' +
                '</PictureDetails>' +
                '<PostalCode>73013</PostalCode>' +
                '<PrimaryCategory>' +
                '<CategoryID>' + '1111' + '</CategoryID>' +
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
                '<StartPrice>' + '20' + '</StartPrice>' +
                '<Title>' + 'this is the title' + '</Title>' +
                '</Item>' +
                '<Version>1019</Version>' +
                '</AddItemRequest>'


        return ebayJson2;

    };
    
    return makeEbayCallJson2();
      
  }

  handleClick() {
      
      this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
    
     console.log(this.sell2());
      var data=this.sell2();
      
       axios.post('https://api.ebay.com/ws/api.dll',
     {
        headers:{
                'X-EBAY-API-COMPATIBILITY-LEVEL': '1019',
                'X-EBAY-API-CALL-NAME': 'AddItem',
                'X-EBAY-API-SITEID': '0',
                'X-EBAY-API-DETAIL-LEVEL': 0,
                'X-EBAY-API-IAF-TOKEN':'AgAAAA**AQAAAA**aAAAAA**Y5ExWg**nY+sHZ2PrBmdj6wVnY+sEZ2PrA2dj6AFmYqoC5mAow+dj6x9nY+seQ**4f4DAA**AAMAAA**aloOJiTqs+eJfiI0TmWCHXLFsfPkd0eRThFQ+f+Fjj+6oLDl6m3B/3IlwjX0+/1nHJu4HnwVwWS3pmlusXMY4Dwq4VoBGAzFar42TFSCMZcR/TrD3h8fzMOL2EQCDyqGHnhzoHQoMptrY4h2mDhokOxG49k6VbtHCu6VVElyYIBrmxamcCQsA4YSNbLX65rTm1KSEs73euaDsnN6rBGnsk3mLU71VZ+gCuaOsGsP4mloK8VYiDhoq0ealgeBZyVgUjFXma924oAdx+yNtEp0KtaJAy18NDZ8jqLLucGNKtUGLzcw+Ibu3e5qFKeoawH0ab0Qw7JzKSRlHR4PNHQwIdmzVY3EN9ffMPlcjAmBvY31qPGYR4Ssj5IcfplIRqjUdhaamSJCebSCT/AUMOOj6dTlVh1nHrlMiqL/hzUu3apCafJ9oJme0yX9o00wtGgvIUO8kJeHPbi9TQOsQS0bsNV0ZWbPPBTVGMgAtepdAtRtQfdjLRBTCzKFFFa1jDNC1i6F8Vec3/ne5muNzhNPC2QWP580TRAIsDoExeIIpwcJFeWXEIafBzAsJjpObST47yqk7Xy5dlAHnS90zwOB+2QZpRKPl05CSkO/+JXkgz5Jsnlc3gNaxZvYFB3rynClBtInp9G+H8tXeQWjH5v5IE/U8d0eUdN9lhjDg4795teB+8PNc0jvIIyJ8xpAV8Q8jjcNf2IByQX3iNQj5/XdeHgxdDdsb0zmfNmQAPwlXkp0J8ze92/GB6BBp1iTMoBx'
        }
     },{
         data: data.xml 
      }).then(function(response){
             
                      console.log(response);                 
          
        });
       
           
  }
  handleChange() {
      
  }

  render() {
    return (
            <div>
       <button onClick={this.handleClick}>{this.asdf}</button>
       </div>
    );
  }
}
//
ReactDOM.render(<TestApi />,document.getElementById('modal_test'));

        



//{this.props.listRadioStuff} is ow to get the old list tiems in imput name div
    