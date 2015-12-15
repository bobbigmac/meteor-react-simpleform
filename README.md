# Meteor/React Simple Form

SimpleForm is a collection of form input react components wired up for meteor to support editing by the user, update the component state when remote data changes.

Inspired by [react-smartform](https://github.com/ffxsam/meteor-react-smartform), but needed server-side-rendering, client-side reactivity for remote updates and a simpler html interface.

* Not production ready, needs work. Contributions welcome :)

## Installation

```bash
meteor add bobigmac:react-simpleform
```

## Example Usage

```jsx
render() {
	return <SimpleForm.TextInput
		defaultValue={this.props.value}
		placeholder={this.props.display}
		multiline={true}
		solveDirty={TextInput.remotePriority}
		onChange={this.handleChange}
		onFocus={this.handleFocus}
		onBlur={this.handleBlur}
	/>
}
```

## Reference

### SimpleForm.TextInput

* `defaultValue`: {String} A default value for the input field
* `type`: {String} defaults to 'text', use for 'password' etc
* `multiline`: {boolean} Falsey gives text input, truthy gives textarea
* `solveDirty`: {Function} A callback which is invoked when the remote value changes but the client-side value is dirty, and is passed three arguments:
  * `remoteValue`: {any} The remotely-modified value of the field 
  * `dirtyValue`: {any} The locally-modified value of the field
  * `props`: {Object} The props passed to the input component
* `onBlur`: {Function} A callback which is invoked when the user leaves the input, and is passed three arguments:
  * `state`: {Object} The modified state of the field 
  * `props`: {Object} The props passed to the input component
* `onFocus`: {Function} A callback which is invoked when the user enters the input, and is passed three arguments:
  * `state`: {Object} The modified state of the field 
  * `props`: {Object} The props passed to the input component
* `onChange`: {Function} A callback which is invoked when the user changes the input value, and is passed three arguments:
  * `state`: {Object} The modified state of the field 
  * `props`: {Object} The props passed to the input component

#### Resolving conflicts

When the meteor data updates remotely the component calls your `solveDirty` handler, which should return the value you want to use. You can use `SimpleForm.remotePriority` or `SimpleForm.dirtyPriority` or implement your own handler to return whatever value (e.g. merge) you want.

The default behaviour is to prioritse the remote, discarding a local dirty value.

## To do

* Needs refs binding (currently storing form state via the onChange handler)
* Simple validation
* More simple tag types (select, radio)
* Composite input types
	* Tags input