import React, { PureComponent } from "react";
import i18n from "i18next";

class LanguageSwitcher extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      lang: 'en'
    }
  }

  changeLanguage = (lng) => {
    this.setState({ lang: lng === 'en' ? 'fi' : 'en' })
    i18n.changeLanguage(this.state.lang);
  }

  render() {
    return (
      <div>
        <button style={{backgroundColor:'#FFF', marginTop: '13px', height:'20px', color:'#ee6324', 'fontWeight':'600', padding: '0 5px',lineHeight:"20px"}}
          onClick={() => {this.changeLanguage(this.state.lang)}} 
        >{this.state.lang ==='en'?'EN':'FI'}</button>
      </div>
    )
  }
}

export default LanguageSwitcher;
