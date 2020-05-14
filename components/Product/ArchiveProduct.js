import React from "react";
import { Button, Icon, Modal } from "semantic-ui-react";
import axios from "axios";
import baseUrl from "../../utils/baseUrl";
import { useRouter } from "next/router";


const ArchiveProduct = ({ user, sku  }) => {

    const [modal, setModal] = React.useState(false);
    const router = useRouter();
    const isRoot = user && user.role === "root";
    const isAdmin = user && user.role === "admin";
    const isRootOrAdmin = isRoot || isAdmin;

    async function handleArchive() {
        const url = `${baseUrl}/api/product`;
        const payload = { sku:sku };
        await axios.patch(url, payload); 
        setModal(false);
        router.push("/");
    }
    return (
        <>
        {isRootOrAdmin && (
            <>
                <Icon
                    link name="archive"
                    color="red"
                    size='large'
                    onClick={() => setModal(true)}
                />
                <Modal size='mini' open={modal}>
                    <Modal.Header>Confirm Archive</Modal.Header>
                    <Modal.Content>
                        <p>Are you sure you want to archive this product?</p>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button content="Cancel" onClick={() => setModal(false)} />
                        <Button
                            negative
                            icon="archive"
                            labelPosition="right"
                            content="Archive"
                            onClick={handleArchive}
                        />
                    </Modal.Actions>
                </Modal>
            </>
        )}
        </>
        );
}


export default ArchiveProduct;