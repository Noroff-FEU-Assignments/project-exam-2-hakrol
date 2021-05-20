import AddPlace from "../adminpanel/AddPlace";
import Enquires from "../adminpanel/Enquires";
import Messages from "../adminpanel/Messages";

function AdminPanel() {
    return (
        <div className="adminpanel">
            <AddPlace />
            <div className="adminpanel-information">
                <Enquires />
                <Messages />
            </div>
        </div>
    );
}

export default AdminPanel;
