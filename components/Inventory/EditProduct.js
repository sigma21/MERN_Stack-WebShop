import React from "react";
import { Modal, Input, Icon, Image, Button, Form, Message, TextArea, Header } from 'semantic-ui-react'
import axios from "axios";
import baseUrl from "../../utils/baseUrl";
import catchErrors from "../../utils/catchErrors";
import { useRouter } from "next/router";


const EditProduct = ({ name, price, quantity, mediaUrl, description, sku }) => {
    const router = useRouter();

    const INITIAL_PRODUCT = {
        name: name,
        price: price,
        quantity: quantity,
        // media: mediaUrl,
        description: description
    };

    const [modal, setModal] = React.useState(false);
    const [product, setProduct] = React.useState(INITIAL_PRODUCT);
    const [mediaPreview, setMediaPreview] = React.useState("");
    const [success, setSuccess] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [disabled, setDisabled] = React.useState(false);
    const [error, setError] = React.useState("");

    React.useEffect(() => {
        const isProduct = Object.values(product).every(el => Boolean(el));
        isProduct ? setDisabled(false) : setDisabled(true);
    }, [product]);

    function handleChange(event) {
        const { name, value, files } = event.target;
        if (name === "media") {
            setProduct(prevState => ({ ...prevState, media: files[0] }));
            setMediaPreview(window.URL.createObjectURL(files[0]));
        } else {
            setProduct(prevState => ({ ...prevState, [name]: value }));
        }
    }

    // async function handleImageUpload() {
    //     const data = new FormData();
    //     data.append("file", product.media);
    //     data.append("upload_preset", "montecarlo");
    //     data.append("cloud_name", "dthh42psp");
    //     const response = await axios.post(process.env.CLOUDINARY_URL, data);
    //     const mediaUrl = response.data.url;
    //     return mediaUrl;
    // }

    async function handleSubmit(event) {
        try {
            // event.preventDefault(); //prevent refreshing page on submit
            setLoading(true);
            setError("");
            // const mediaUrl = await handleImageUpload();
            const url = `${baseUrl}/api/product`;
            const { name, price, quantity, description } = product;
            const payload = { name, price, quantity, description, sku };
            const response = await axios.put(url, payload);
            setProduct(INITIAL_PRODUCT);
            setSuccess(true);
            setModal(false);
            router.push("/inventory");
        } catch (error) {
            catchErrors(error, setError);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <Icon link name='edit' size='large' color='blue' onClick={() => setModal(true)} />
            <Modal open={modal} centered={false}>
                <Modal.Header>Product Details</Modal.Header>
                <Modal.Content image>
                    <Image wrapped size='small' src={mediaUrl} />
                    <Modal.Description>
                        <Form
                            loading={loading}
                            success={success}
                            error={Boolean(error)}
                            onSubmit={handleSubmit}>
                            <Message
                                success
                                icon="check"
                                header="Success!"
                                content="Your product has been updated."
                            />
                            <Message error header="Oops!" content={error} />
                            <Form.Group widths="equal">
                                <Form.Field
                                    control={Input}
                                    name="name"
                                    label="Name"
                                    placeholder="Name"
                                    value={product.name}
                                    type="text"
                                    onChange={handleChange}
                                />
                                <Form.Field
                                    control={Input}
                                    name="price"
                                    label="Price"
                                    placeholder="Price"
                                    min="0.00"
                                    step="0.01"
                                    type="number"
                                    value={product.price}
                                    onChange={handleChange}
                                />
                                <Form.Field
                                    control={Input}
                                    name="quantity"
                                    label="Quantity"
                                    placeholder="Quantity"
                                    min="0"
                                    step="1"
                                    default='0'
                                    type="number"
                                    value={product.quantity}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            {/* <Form.Field
                            control={Input}
                            name="media"
                            label="Media"
                            content="Select Image"
                            accept="image/*"
                            type="file"
                            onChange={handleChange}
                        /> */}
                            {/* <Image src={mediaPreview} rounded centered size="small" /> */}
                            <Form.Field
                                control={TextArea}
                                name="description"
                                label="Description"
                                placeholder="Description"
                                value={product.description}
                                onChange={handleChange}
                            /><br/>
                            {/* <Form.Group>
                                <Form.Field
                                    control={Button}
                                    disabled={disabled || loading}
                                    color="blue"
                                    icon="window close"
                                    content="Cancel"
                                    floated='right'
                                    onClick={() => setModal(false)}
                                />
                                <Form.Field
                                    control={Button}
                                    disabled={disabled || loading}
                                    color="blue"
                                    icon="pencil alternate"
                                    content="Submit Changes"
                                    type="submit"
                                    floated='right'
                                />
                            </Form.Group> */}
                        </Form>
                        <Modal.Actions>
                            <Button
                                floated='right'
                                negative
                                icon="pencil alternate"
                                labelPosition="right"
                                content="Submit Changes"
                                onClick={handleSubmit}
                            />
                            <Button floated='right' content="Cancel" onClick={() => setModal(false)} />
                        </Modal.Actions>
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        </>
    )
}


export default EditProduct;