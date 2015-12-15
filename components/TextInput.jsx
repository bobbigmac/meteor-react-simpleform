SimpleForm.TextInput = React.createClass({
	getInitialState: function() {
		return {
			value: this.props.defaultValue
		};
	},
	componentWillReceiveProps(nextProps) {
		const cur = this.state && this.state.value;
		let val = nextProps.defaultValue || '';
		let isDirty = (this.state && this.state.isDirty);
		let isEqual = _.isEqual(val, cur);

		// Update the state if it's an external message, and changed
		// TODO: Probably missing some useful event types
		if(!isEqual && 
			(event instanceof MessageEvent || event instanceof PopStateEvent)
		) {
			if(isDirty && this.props.solveDirty) {
				val = this.props.solveDirty(val, cur, this.props);
				isEqual = _.isEqual(val, cur);
			}
			if(!isEqual) {
				this.setState({ value: val });
			}
		}
	},
	blurred(event) {
		if(this.props.onBlur) {
			this.props.onBlur(this.state, this.props);
		}
	},
	focused(event) {
		if(this.props.onBlur) {
			this.props.onBlur(this.state, this.props);
		}
	},
	changed(event) {
		const val = event.target && event.target.value;
		const cur = this.state && this.state.value;

		if(!_.isEqual(cur, val)) {
			let newState = { value: val, isDirty: true };
			this.setState(newState);
			
			if(this.props.onChange) {
				this.props.onChange(newState, this.props);
			}
		}
	},
	render() {
		//const tagName = (this.props.multiline ? 'textarea', 'input')
		if(this.props.multiline) {
			return (
				<textarea
					{...this.props}
					value={this.state.value}
					onChange={this.changed} 
					onFocus={this.focused}
					onBlur={this.blurred} />
				);
		} else {
			return (
				<input type={this.props.type || 'text'}
					{...this.props}
					value={this.state.value}
					onChange={this.changed}
					onFocus={this.focused}
					onBlur={this.blurred} />
				);
		}
	}
});