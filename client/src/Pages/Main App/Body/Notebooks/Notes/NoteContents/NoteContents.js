import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { setBackButton } from "../../../../../../Redux/Actions/ChangeHeaderNavigation";
import changeTitle from "../../../../../../Redux/Actions/ChangeTitle";

export default function NoteContents() {

    const { noteTitle } = useParams();

    const dispatch = useDispatch();

    const createTitle = (noteURL) => {
        return noteURL
                        .replaceAll('-', ' ')
                        .split(' ')
                        .map((word) => {
                            const firstLetter = word[0].toUpperCase();
                            return `${firstLetter}${word.slice(1)} `
                        });
    }

    dispatch(changeTitle(createTitle(noteTitle)));
    dispatch(setBackButton());

    return (
       <div>
           <CKEditor
                editor={ClassicEditor}
           />
       </div>
    );
}