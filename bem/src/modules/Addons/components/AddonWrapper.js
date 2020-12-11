import React, {Component} from "react"
import styled from "styled-components"


const DomWrapper = styled.div`
	position: absolute;
	display: flex;
	flex-direction: column;
	border: 1px solid black;
	border-radius: 5px;
`

const WrapperHeader = styled.div`
	display: flex;
	flex-direction: row;
	width: 100%;
	flex-basis: 45px;
	flex-grow: 0;
	flex-shrink: 0;
	background-color: #eeeeee;
`

const HeaderContent = styled.div`
	flex-grow: 1;
	flex-shrink: 1;
`

const HeaderControl = styled.div`
	flex-basis: 15px;
	flex-grow: 0;
	flex-shrink: 0;
`

const WrapperFooter = styled.div`
	display: flex;
	flex-direction: row;
	width: 100%;
	flex-basis: 15px;
	flex-grow: 0;
	flex-shrink: 0;
	background-color: #eeeeee;
`

const FooterContent = styled.div`
	line-height: 14px;
	flex-grow: 1;
	flex-shrink: 1;
`


const ResizeControl = styled.div`
	flex-basis: 7px;
	flex-grow: 0;
	flex-shrink: 0;
	cursor: se-resize;
	border-top: 5px solid transparent;
	border-left: 5px solid transparent;
	border-right: 5px solid #00000045;
	border-bottom: 5px solid #00000045;
`

const WrapperContent = styled.div`
	background-color: white;
	position: relative;
	z-index: 1;
	width: 100%;
	flex-grow: 1;
	flex-shrink: 1;
`
const WrapperIframe = styled.iframe`
	width: 100%;
	height: 100%;
	border-width: 0px;
`

const ContentOverlay = styled.div`
	position: absolute;
	width: 100%;
	height: 100%;
	z-index: 2;
`

var disableSelection = function(){
	document.body.style.userSelect = "none"
	document.body.setAttribute("unselectable", "on")
	document.body.onselectstart = () => false
};

var enableSelection = function(){
 	document.body.style.userSelect = "auto"
	document.body.setAttribute("unselectable", "off")
	document.body.onselectstart = () => {}
};

class AddonWrapper extends Component {

	constructor(props){
		super(props)
		this.state = {
			src: props.src,
			overlay: false,
			window: {
				top:    parseInt(props.top),
				left:   parseInt(props.left),
				width:  parseInt(props.width),
				height: parseInt(props.height),
			}
		}

	}

	movePanel(e){

		if(e.button > 0) return
		
		const baseX = e.screenX, baseY = e.screenY
		const winX = this.state.window.left, winY = this.state.window.top

		disableSelection()

		const handleMove = (e) => {
			const diffX = e.screenX - baseX
			const diffY =  e.screenY - baseY
			this.setState({
				overlay: true,
				window: {
					top:    Math.min(Math.max(10, winY + diffY), window.innerHeight - this.state.window.height - 10),
					left:   Math.min(Math.max(10, winX + diffX), window.innerWidth - this.state.window.width - 10),
					width:  this.state.window.width,
					height: this.state.window.height,
				}
			})
		}
		
		const releaseMove = (e) => {
			handleMove(e)
			enableSelection()
			document.body.removeEventListener("mousemove",  handleMove   )
			document.body.removeEventListener("mouseup",    releaseMove  )
			document.body.removeEventListener("mouseleave", releaseMove  )
			this.setState({ overlay: false})
			this.props.onChange && this.props.onChange(this.state.window)
		}
		
		document.body.addEventListener("mousemove",  handleMove   )
		document.body.addEventListener("mouseup",    releaseMove  )
		document.body.addEventListener("mouseleave", releaseMove  )
		handleMove(e)
	}

	resizePanel(e){

		if(e.button > 0) return
		
		const baseX = e.screenX, baseY = e.screenY
		const winX = this.state.window.width, winY = this.state.window.height

		disableSelection()

		const handleMove = (e) => {
			const diffX = e.screenX - baseX
			const diffY =  e.screenY - baseY
			this.setState({
				overlay: true,
				window: {
					top:  this.state.window.top,
					left: this.state.window.left,
					width:     winX + diffX,
					height:    winY + diffY,
				}
			})
		}
		
		const releaseMove = (e) => {
			handleMove(e)
			enableSelection()
			document.body.removeEventListener("mousemove",  handleMove   )
			document.body.removeEventListener("mouseup",    releaseMove  )
			document.body.removeEventListener("mouseleave", releaseMove  )
			this.setState({ overlay: false})
			this.props.onChange && this.props.onChange(this.state.window)
		}
		
		document.body.addEventListener("mousemove",  handleMove   )
		document.body.addEventListener("mouseup",    releaseMove  )
		document.body.addEventListener("mouseleave", releaseMove  )
		handleMove(e)
	}

	bindIframe(el){
		if(this.iframeWindow || !el) return
		this.iframeWindow = el.contentWindow
		window.addEventListener("message", (msg) => {
			if(msg.source === this.iframeWindow){
				if(msg.data.type === "READY"){
					this.iframeWindow.postMessage({
						type: "INIT",
						options: {
							  UUID: "dev-02",
							  project_endpoint: "https://dev-02.workers.dev.usonia.io/api",
							  library_endpoint: "https://dev-02.workers.dev.usonia.io/api",
							  project_id : 11,
							  library_id: 10,
							  selected_objects: [],
							  panel_width: 250,
							  context: {
							    idf_document: {
							      id: 11,
							      idf_version: "9.0"
							    }    
							  }
						}
					}, "*")
				}
			}
		})
	}

	closePanel(){
		this.props.onClose && this.props.onClose()
	}

	render(){
		const { window, overlay, src } = this.state

		const panelStyles = {
			top: window.top + "px",
			left: window.left + "px",
			width: window.width + "px",
			height: window.height + "px",
		}

		return <DomWrapper style={panelStyles} >
			<WrapperHeader>
				<HeaderContent onMouseDown={this.movePanel.bind(this)}>
					Header info here
				</HeaderContent>
				<HeaderControl>_</HeaderControl>
				<HeaderControl onClick={ ()=>this.closePanel() }>x</HeaderControl>
			</WrapperHeader>
			<WrapperContent>
				{ overlay ? <ContentOverlay /> : null }
				<WrapperIframe src={src} ref={(el)=>this.bindIframe(el)}></WrapperIframe>
			</WrapperContent>
			<WrapperFooter>
				<FooterContent> </FooterContent>
				<ResizeControl onMouseDown={this.resizePanel.bind(this)}></ResizeControl>
			</WrapperFooter>
		</DomWrapper>
	}

}


export default AddonWrapper




