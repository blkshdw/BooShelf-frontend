import React, { Component, PropTypes } from 'react';
import Editor, { createEditorStateWithText } from 'draft-js-plugins-editor';
import { Modifier, ContentState, EditorState } from 'draft-js';
import { FontIcon, Button, IconButton } from 'react-toolbox';
import EmojiPicker from 'emojione-picker';
import 'draft-js-hashtag-plugin/lib/plugin.css';
import createEmojiPlugin from 'draft-js-emoji-plugin';
import attachImmutableEntitiesToEmojis from 'draft-js-emoji-plugin/lib/modifiers/attachImmutableEntitiesToEmojis';
import { IconMenu, MenuItem, List, ListSubHeader, ListItem } from 'react-toolbox';
import cx from './TextEditor.styl';

const emojiPlugin = createEmojiPlugin();
const { EmojiSuggestions } = emojiPlugin;

export default class TextEditor extends Component {

    static propTypes = {
        value: PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.number
        ]),
        placeholder: PropTypes.string,
        onChange: PropTypes.func,
        onReturn: PropTypes.func,
        className: PropTypes.string,
        children: PropTypes.node
    };

    static defaultProps = {
        value: '',
        placeholder: '',
        className: '',
        onChange: () => {},
        onReturn: () => {}
    };

    constructor(props) {
        super(props);
        this.value = props.value;
        const newEditorState = createEditorStateWithText(props.value);
        this.state = {
            emojiVisible: false,
            editorState: EditorState.moveFocusToEnd(newEditorState, newEditorState.getCurrentContent().getSelectionAfter())
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.value !== this.value) {
            const newEditorContent = ContentState.createFromText(nextProps.value);
            const newEditorState = EditorState.push(
                this.state.editorState,
                newEditorContent,
                'insert-emoji',
            );
            this.setState({
                editorState: EditorState.moveFocusToEnd(newEditorState)
            })
            this.value = nextProps.value
        }
    }

    render() {
        const { placeholder, className, children } = this.props;
        const { emojiVisible } = this.state;
        return (
            <div className={cx('text-editor')}>
                <IconButton icon="mood" className={cx('emoji-icon')} onClick={() => {this.setState({emojiVisible: !this.state.emojiVisible})}} />
                <div className={cx('editor', 'form-control', className)}>
                    <Editor handleReturn={::this.handleReturn} editorState={this.state.editorState} plugins={ [emojiPlugin] } onChange={::this.handleInputChanges}/>
                    <EmojiSuggestions />
                </div>
                {emojiVisible && this.renderEmoji()}
            </div>
        );
    }

    handleInputChanges(editorState) {
        if (editorState) {
            this.setState({editorState});
            this.value = editorState.getCurrentContent().getPlainText();
            this.props.onChange(editorState.getCurrentContent().getPlainText());
        }
    }

    renderEmoji() {
        return (
            <div className={cx('emoji-picker')}>
                <EmojiPicker className={cx('picker')} onChange={::this.takeEmoji} />
            </div>)
    }

    takeEmoji(emoji) {
        const { editorState } = this.state;
        const currentContentState = editorState.getCurrentContent();
        const currentSelectionState = editorState.getSelection();

        // in case text is selected it is removed and then the emoji is appended
        const afterRemovalContentState = Modifier.removeRange(
            currentContentState,
            currentSelectionState,
            'backward'
        );

        const targetSelection = afterRemovalContentState.getSelectionAfter();

        const emojiInsertedContent = Modifier.insertText(
            this.state.editorState.getCurrentContent(),
            targetSelection,
            String.fromCodePoint(parseInt(emoji.unicode, 16))
        );
        const newEditorState = EditorState.push(
            this.state.editorState,
            emojiInsertedContent,
            'insert-emoji',
        );
        this.setState({
            editorState: attachImmutableEntitiesToEmojis(EditorState.forceSelection( newEditorState, newEditorState.getCurrentContent().getSelectionAfter()))
        });
        this.value = newEditorState.getCurrentContent().getPlainText()
    }

    handleReturn(event) {
        return this.props.onReturn(event)
    }
}
