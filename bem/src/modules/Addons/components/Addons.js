import React, {Component} from "react"
import styled from "styled-components"

import AddonWrapper from "addon-wrapper";

const AddonsBarContainer = styled.div`
    z-index: 1000;
    position: fixed;
    left: 0px;
    right: 0px;
    top: 0px;
    height: 0px;
    overflow: visible;
`
// "https://csb-s8yp6.netlify.com"
class Addons extends Component {

    constructor(props){
      super();
      this.state = {
        addon_panels: []
      }
    }

    showAddon(addon){
      const {contexts} = this.props

      const context_data = {
        src: addon.manifest.url,
        context: {},
        ...addon.manifest.panel
      }

      this.setState({
        addon_panels: this.state.addon_panels.concat([context_data])
      })

    }


    closeAddon(addon){
      this.setState({
        addon_panels: this.state.addon_panels.filter( ap => ap.id !== addon.id)
      })

    }

    render(){

        const {addons_data} = this.props

        const {addon_panels} = this.state

        return <AddonsBarContainer>

          { 
            addons_data.map( addon => <p style={({"text-align": "center"})}>
              <a 
                onClick={ e => this.showAddon(addon) }
                style={ !addon.active ? { opacity: "0.3", "pointer-events": "none" } : null }
                href="javascript:void(0)"
              >{addon.manifest.name}</a>
            </p> )
          }

          {
            addon_panels.map( addon_panel => <AddonWrapper 
              {...addon_panel}
              onClose={ () => this.closeAddon(addon_panel)
            } 
            /> )
          }



            
        </AddonsBarContainer>
    }
}

export default Addons;
            // <AddonWrapper
            //   src="http://localhost:8000/"
            //   top="100"
            //   left="150"
            //   width="450"
            //   height="250"
            // />

            // <AddonWrapper
            //   src="https://csb-s8yp6.netlify.com"
            //   top="100"
            //   left="450"
            //   width="450"
            //   height="250"
            // />