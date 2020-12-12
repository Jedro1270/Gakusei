import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { setBackButton } from "../../../../../../Redux/Actions/ChangeHeaderNavigation";
import changeTitle from "../../../../../../Redux/Actions/ChangeTitle";

export default function NoteContents() {

    // const { noteTitle } = useParams();

    const dispatch = useDispatch();

    dispatch(changeTitle(''));
    dispatch(setBackButton());

    return (
       <div>

       </div>
    );
}