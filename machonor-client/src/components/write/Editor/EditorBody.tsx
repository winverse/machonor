/* tslint:disable */
import * as React from 'react';
import styled from 'styled-components';
import { media } from 'styles/styleUtils';

const Editor = styled.div`
  background-color: red;
  @media ${media.xxMobile} {
    font-size: 12px;
  }
`;

interface IProps {
  defaultValue?: string;
  isMobile?: boolean;
  urlSlug?: string;
  onChange(e: any): void;
}
interface IState {
  content: string;
}

class EditorBody extends React.Component<IProps, IState> {
  public onSetEditor = () => {
    const { isMobile, defaultValue, urlSlug } = this.props;
    const editor = CKEDITOR.replace('editor', {
      height: isMobile ? 200 : 500,
      filebrowserUploadUrl: '/api/posts/upload',
      extraPlugins: 'youtube',
      resize_maxWidth: 700,
    });
    CKEDITOR.plugins.addExternal('youtube', '/public/ckeditor/plugins/youtube/', 'plugin.js');
    CKEDITOR.config.toolbarGroups = [
        { name: 'document', groups: [ 'mode', 'document', 'doctools' ] },
        { name: 'editing', groups: [ 'find', 'selection', 'spellchecker', 'editing' ] },
        { name: 'forms', groups: [ 'forms' ] },
        { name: 'styles', groups: [ 'styles' ] },
        { name: 'colors', groups: [ 'colors' ] },
        { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
        { name: 'paragraph', groups: [ 'list', 'indent', 'blocks', 'align', 'bidi', 'paragraph' ] },
        { name: 'links', groups: [ 'links' ] },
        { name: 'insert', groups: [ 'insert' ] },
        { name: 'tools', groups: [ 'tools' ] },
        { name: 'others', groups: [ 'others' ] },
        { name: 'about', groups: [ 'about' ] }
      ];
    if (urlSlug && (defaultValue !== undefined || defaultValue !== '')) {
      CKEDITOR.instances['editor'].setData(defaultValue!);
    }
    CKEDITOR.config.removeButtons = 'Source,Save,NewPage,Templates,Preview,Print,Cut,Copy,Paste,PasteText,PasteFromWord,Redo,Undo,Find,Replace,SelectAll,Scayt,Form,Checkbox,Radio,TextField,Textarea,Select,Button,ImageButton,HiddenField,Strike,Subscript,Superscript,CopyFormatting,RemoveFormat,NumberedList,BulletedList,Outdent,Indent,Blockquote,CreateDiv,BidiLtr,BidiRtl,Language,Anchor,Unlink,Link,PageBreak,SpecialChar,Iframe,HorizontalRule,Table,Flash,Font,Format,ShowBlocks,About,Maximize,Styles';
    editor.on('change', this.props.onChange);
  }

  public componentDidMount(){
    this.onSetEditor();
  }
  public componentDidUpdate(prevProps: IProps) {
    if (prevProps.defaultValue !== this.props.defaultValue) {
      const { urlSlug } = this.props;
      const value = this.props.defaultValue;
      if(!urlSlug || (!value || value === '')) return;
      CKEDITOR.instances['editor'].setData(value);
    }
  }
  public render() {
    return (
      <Editor id="editor" />
    );
  }
}

export default EditorBody;