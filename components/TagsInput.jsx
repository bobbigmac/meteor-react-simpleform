//TODO: Not finished
SimpleForm.TagsInput = React.createClass({
  getInitialState: function() {
  	const val = (this.props.defaultValue || this.props.value);
  	const checked = (this.props.checked instanceof Array && this.props.checked) || [];

  	if(val instanceof Array) {
  		return { tags: val, checked: checked };
  	}

		const str = ''+((this.props && val) || '');
  	return {
  		tags: str.split(/\s*,\s*/)
  	};
  },
	tagClicked(tag) {
		let index = -1;
		let newState = false;

		if(this.state && 
				this.state.tags && 
				this.state.tags.indexOf && 
				(index = this.state.tags.indexOf(tag)) > -1) {

			if(this.props.type == 'toggle') {
				const checkIndex = this.state.checked.indexOf(tag);
				if(checkIndex > -1) {
					this.state.checked.splice(checkIndex, 1);
				} else {
					this.state.checked.push(tag);
				}

				newState = this.state;
				newState.value = newState.checked;
				this.setState({ checked: this.state.checked });
			} else {
				this.state.tags.splice(index, 1);

				newState = this.state;
				newState.value = newState.tags;
				this.setState({ tags: this.state.tags });
			}
		}

		if(newState && this.props.onChange) {
			this.props.onChange(newState, this.props);
		}
	},
	render() {
		const toggle = (this.props.type == 'toggle');
		//TODO: Render text input for adding tags
		const addable = (this.props.addable);

		return (
			<div className="tags" {...this.props}>
				{
					this.state.tags.map(function(tag, pos) {
						const checkIndex = this.state.checked.indexOf(tag);
						const isChecked = (checkIndex > -1);

						return (
							<button
								className={"tag "+(this.props.btnClassName||'')+(isChecked ? ' active' : '')}
								data-toggle={toggle ? "button" : false}
								onClick={this.tagClicked.bind(this, tag)} 
								key={tag+'_'+pos} 
								tabIndex={this.props.tabIndex} 
								aria-pressed={isChecked}>
								{this.props.contents ? this.props.contents[pos] : tag}
							</button>);
					}.bind(this))
				}
			</div>);
	}
});