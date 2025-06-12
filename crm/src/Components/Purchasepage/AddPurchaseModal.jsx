// import { useState } from "react";
// import { Button, Col, Modal, Row } from "react-bootstrap";
// import { Form } from "react-bootstrap";
// import CopyFromSpreadsheetModal from "./CopyFromSpreadsheetModal";

// const AddPurchaseModal = ({ show, onHide }) => {

//     const [items, setItems] = useState([
//         { description: "", quantity: 1, unitCost: "", job: "" }
//     ]);

//     const [showSpreadsheetModal, setShowSpreadsheetModal] = useState(false);

//     const handleItemChange = (index, field, value) => {
//         const newItems = [...items];
//         newItems[index][field] = value;
//         setItems(newItems);
//     };

//     const addItem = () => {
//         setItems([...items, { description: "", quantity: 1, unitCost: "", job: "" }]);
//     };

//     const removeItem = (index) => {
//         const newItems = items.filter((_, i) => i !== index);
//         setItems(newItems);
//     };


//     return (
//         <>
//             <Modal
//                 show={show}
//                 onHide={() => {
//                     setShowSpreadsheetModal(false);
//                     onHide();
//                 }}
//                 fullscreen  // Changed from size="lg" to fullscreen
//                 backdrop={showSpreadsheetModal ? "static" : true}
//                 keyboard={!showSpreadsheetModal}
//             >
//                 <div
//                     style={showSpreadsheetModal ? {
//                         pointerEvents: "none",
//                         opacity: 0.5,
//                         height: '100%',
//                         display: 'flex',
//                         flexDirection: 'column'
//                     } : {
//                         height: '100%',
//                         display: 'flex',
//                         flexDirection: 'column'
//                     }}
//                 >
//                     <Modal.Header closeButton={!showSpreadsheetModal}>
//                         <Modal.Title>New purchase</Modal.Title>
//                     </Modal.Header>
//                     <Modal.Body style={{ flex: 1, overflowY: 'auto' }}>
//                         <Form>
//                             <Form.Group className="mb-3">
//                                 <Form.Label>Purchase Type</Form.Label>
//                                 <Form.Select defaultValue="">
//                                     <option value="" disabled>Select Purchase Type</option>
//                                     <option>Purchase Order (vendor will send an invoice)</option>
//                                     <option>Expense (paid with cash or debit card)</option>
//                                     <option>Reimbursement (company will reimburse me)</option>
//                                 </Form.Select>
//                             </Form.Group>

//                             <Form.Group className="mb-3">
//                                 <Form.Label>Person to be Reimbursed</Form.Label>
//                                 <Form.Control placeholder="Type name" />
//                             </Form.Group>

//                             <div className="d-flex justify-content-between align-items-center mb-2">
//                                 <h6 className="mb-0">Item</h6>
//                                 <div>
//                                     <Button
//                                         variant="outline-secondary"
//                                         size="sm"
//                                         onClick={() => setShowSpreadsheetModal(true)}
//                                         disabled={showSpreadsheetModal}
//                                         className="me-2"
//                                     >
//                                         Copy from spreadsheet
//                                     </Button>
//                                     <Button variant="outline-primary" size="sm" onClick={addItem}>
//                                         + Add another item
//                                     </Button>
//                                 </div>
//                             </div>

//                             <div style={{ maxHeight: '40vh', overflowY: 'auto' }}>
//                                 {/* {items.map((item, index) => (
//                                     <Row key={index} className="mb-2 align-items-end">
//                                         <Col md={5}>
//                                             <Form.Label className="small mb-0">Description</Form.Label>
//                                             <Form.Control
//                                                 placeholder="Enter description"
//                                                 value={item.description}
//                                                 onChange={(e) => handleItemChange(index, "description", e.target.value)}
//                                             />
//                                         </Col>
//                                         <Col md={2}>
//                                             <Form.Label className="small mb-0">Qty</Form.Label>
//                                             <Form.Control
//                                                 type="number"
//                                                 value={item.quantity}
//                                                 onChange={(e) => handleItemChange(index, "quantity", e.target.value)}
//                                             />
//                                         </Col>
//                                         <Col md={2}>
//                                             <Form.Label className="small mb-0">Unit Cost</Form.Label>
//                                             <Form.Control
//                                                 type="number"
//                                                 placeholder="$"
//                                                 value={item.unitCost}
//                                                 onChange={(e) => handleItemChange(index, "unitCost", e.target.value)}
//                                             />
//                                         </Col>
//                                         <Col md={3}>
//                                             <Form.Label className="small mb-0">Job</Form.Label>
//                                             <Form.Control
//                                                 placeholder="Search Job"
//                                                 value={item.job}
//                                                 onChange={(e) => handleItemChange(index, "job", e.target.value)}
//                                             />
//                                         </Col>
//                                     </Row>
//                                 ))} */}
//                                 {items.map((item, index) => (
//                                     <div key={index} className="position-relative mb-3 border rounded p-3">
//                                         <button
//                                             type="button"
//                                             className="btn-close position-absolute top-0 end-0 m-2"
//                                             aria-label="Remove"
//                                             onClick={() => removeItem(index)}
//                                         ></button>

//                                         <Row className="align-items-end">
//                                             <Col md={5}>
//                                                 <Form.Label className="small mb-0">Description</Form.Label>
//                                                 <Form.Control
//                                                     placeholder="Enter description"
//                                                     value={item.description}
//                                                     onChange={(e) => handleItemChange(index, "description", e.target.value)}
//                                                 />
//                                             </Col>
//                                             <Col md={2}>
//                                                 <Form.Label className="small mb-0">Qty</Form.Label>
//                                                 <Form.Control
//                                                     type="number"
//                                                     value={item.quantity}
//                                                     onChange={(e) => handleItemChange(index, "quantity", e.target.value)}
//                                                 />
//                                             </Col>
//                                             <Col md={2}>
//                                                 <Form.Label className="small mb-0">Unit Cost</Form.Label>
//                                                 <Form.Control
//                                                     type="number"
//                                                     placeholder="$"
//                                                     value={item.unitCost}
//                                                     onChange={(e) => handleItemChange(index, "unitCost", e.target.value)}
//                                                 />
//                                             </Col>
//                                             <Col md={3}>
//                                                 <Form.Label className="small mb-0">Job</Form.Label>
//                                                 <Form.Control
//                                                     placeholder="Search Job"
//                                                     value={item.job}
//                                                     onChange={(e) => handleItemChange(index, "job", e.target.value)}
//                                                 />
//                                             </Col>
//                                         </Row>
//                                     </div>
//                                 ))}
//                             </div>

//                             <Row className="mt-3">
//                                 <Col md={6}>
//                                     <Form.Group className="mb-3">
//                                         <Form.Check label="Set Purchase Date" />
//                                         <Form.Check label="Upload Supporting Documents" />
//                                     </Form.Group>
//                                 </Col>
//                                 <Col md={6}>
//                                     <Form.Group className="mb-3">
//                                         <Form.Label>Notes</Form.Label>
//                                         <Form.Control as="textarea" rows={3} placeholder="Type here" />
//                                     </Form.Group>
//                                 </Col>
//                             </Row>
//                         </Form>
//                     </Modal.Body>
//                     <Modal.Footer className="border-top py-3">
//                         <div className="me-auto fw-bold fs-5">Total: $0.00</div>
//                         <Button variant="light" onClick={onHide}>
//                             Cancel
//                         </Button>
//                         <Button variant="primary">✔ Verify & Submit</Button>
//                     </Modal.Footer>
//                 </div>
//             </Modal>
//             <CopyFromSpreadsheetModal
//                 show={showSpreadsheetModal}
//                 onHide={() => setShowSpreadsheetModal(false)}
//             />
//         </>
//     );
// }

// export default AddPurchaseModal;
import { useState } from "react";
import { Button, Col, Modal, Row, Form } from "react-bootstrap";
import CopyFromSpreadsheetModal from "./CopyFromSpreadsheetModal";
import { useDispatch } from "react-redux";
import { purchaseOrder } from "../../slices/purchaseOrderSlice";

const AddPurchaseModal = ({ show, onHide }) => {
    const dispatch = useDispatch();

    const [purchaseType, setPurchaseType] = useState("");
    const [reimbursedTo, setReimbursedTo] = useState("");
    const [notes, setNotes] = useState("");
    const [items, setItems] = useState([{ description: "", quantity: 1, unitCost: "", job: "" }]);
    const [showSpreadsheetModal, setShowSpreadsheetModal] = useState(false);

    const handleItemChange = (index, field, value) => {
        const newItems = [...items];
        newItems[index][field] = value;
        setItems(newItems);
    };

    const addItem = () => {
        setItems([...items, { description: "", quantity: 1, unitCost: "", job: "" }]);
    };

    const removeItem = (index) => {
        const newItems = items.filter((_, i) => i !== index);
        setItems(newItems);
    };

    const calculateTotal = () => {
        return items.reduce((acc, item) => {
            const qty = parseFloat(item.quantity) || 0;
            const cost = parseFloat(item.unitCost) || 0;
            return acc + qty * cost;
        }, 0).toFixed(2);
    };

    const handleSubmit = () => {
        const payload = {
            purchase_type: purchaseType,
            person_to_be_reimbursed: reimbursedTo,
            notes,
            item: items,
        };

        console.log(payload);


        dispatch(purchaseOrder(payload)).then((res) => {
            if (res.type.includes("fulfilled")) {
                alert("Purchase order submitted successfully!");
                setItems([{ description: "", quantity: 1, unitCost: "", job: "" }]);
                setPurchaseType("");
                setReimbursedTo("");
                setNotes("");
                onHide();
            } else {
                alert("Error submitting order: " + res.payload);
            }
        });
    };

    return (
        <>
            <Modal
                show={show}
                onHide={() => {
                    setShowSpreadsheetModal(false);
                    onHide();
                }}
                fullscreen
                backdrop={showSpreadsheetModal ? "static" : true}
                keyboard={!showSpreadsheetModal}
            >
                <div
                    style={{
                        pointerEvents: showSpreadsheetModal ? "none" : "auto",
                        opacity: showSpreadsheetModal ? 0.5 : 1,
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <Modal.Header closeButton={!showSpreadsheetModal}>
                        <Modal.Title>New Purchase</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ flex: 1, overflowY: "auto" }}>
                        <Form>
                            {/* Step 1: Purchase Type */}
                            <Form.Group className="mb-3">
                                <Form.Label>Purchase Type</Form.Label>
                                <Form.Select
                                    value={purchaseType}
                                    onChange={(e) => setPurchaseType(e.target.value)}
                                >
                                    <option value="" disabled>
                                        Select Purchase Type
                                    </option>
                                    <option>Purchase Order (vendor will send an invoice)</option>
                                    <option>Expense (paid with cash or debit card)</option>
                                    <option>Reimbursement (company will reimburse me)</option>
                                </Form.Select>
                            </Form.Group>

                            {/* Step 2: Reimbursed To */}
                            {purchaseType && (
                                <Form.Group className="mb-3">
                                    <Form.Label>Person to be Reimbursed</Form.Label>
                                    <Form.Control
                                        placeholder="Type name"
                                        value={reimbursedTo}
                                        onChange={(e) => setReimbursedTo(e.target.value)}
                                    />
                                </Form.Group>
                            )}

                            {/* Step 3: Remaining Form (after 4+ chars) */}
                            {reimbursedTo.length >= 4 && (
                                <>
                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                        <h6 className="mb-0">Item</h6>
                                        <div>
                                            <Button
                                                variant="outline-secondary"
                                                size="sm"
                                                onClick={() => setShowSpreadsheetModal(true)}
                                                disabled={showSpreadsheetModal}
                                                className="me-2"
                                            >
                                                Copy from spreadsheet
                                            </Button>
                                            <Button variant="outline-primary" size="sm" onClick={addItem}>
                                                + Add another item
                                            </Button>
                                        </div>
                                    </div>

                                    <div style={{ maxHeight: "40vh", overflowY: "auto" }}>
                                        {items.map((item, index) => (
                                            <div key={index} className="position-relative mb-3 border rounded p-3">
                                                <button
                                                    type="button"
                                                    className="btn-close position-absolute top-0 end-0 m-2"
                                                    aria-label="Remove"
                                                    onClick={() => removeItem(index)}
                                                ></button>
                                                <Row className="align-items-end">
                                                    <Col md={4}>
                                                        <Form.Label className="small mb-0">Description</Form.Label>
                                                        <Form.Control
                                                            placeholder="Enter description"
                                                            value={item.description}
                                                            onChange={(e) => handleItemChange(index, "description", e.target.value)}
                                                        />
                                                    </Col>
                                                    <Col md={2}>
                                                        <Form.Label className="small mb-0">Qty</Form.Label>
                                                        <Form.Control
                                                            type="number"
                                                            value={item.quantity}
                                                            onChange={(e) => handleItemChange(index, "quantity", e.target.value)}
                                                        />
                                                    </Col>
                                                    <Col md={2}>
                                                        <Form.Label className="small mb-0">Unit Cost</Form.Label>
                                                        <Form.Control
                                                            type="number"
                                                            placeholder="$"
                                                            value={item.unitCost}
                                                            onChange={(e) => handleItemChange(index, "unitCost", e.target.value)}
                                                        />
                                                    </Col>
                                                    <Col md={1}>
                                                        <Form.Label className="small mb-0">Total</Form.Label>
                                                        <div className="form-control-plaintext fw-bold">
                                                            ${((parseFloat(item.quantity) || 0) * (parseFloat(item.unitCost) || 0)).toFixed(2)}
                                                        </div>
                                                    </Col>
                                                    <Col md={3}>
                                                        <Form.Label className="small mb-0">Job</Form.Label>
                                                        <Form.Control
                                                            placeholder="Search Job"
                                                            value={item.job}
                                                            onChange={(e) => handleItemChange(index, "job", e.target.value)}
                                                        />
                                                    </Col>
                                                </Row>
                                            </div>
                                        ))}
                                    </div>

                                    <Row className="mt-3">
                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Check label="Set Purchase Date" />
                                                <Form.Check label="Upload Supporting Documents" />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Notes</Form.Label>
                                                <Form.Control
                                                    as="textarea"
                                                    rows={3}
                                                    placeholder="Type here"
                                                    value={notes}
                                                    onChange={(e) => setNotes(e.target.value)}
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </>
                            )}
                        </Form>
                    </Modal.Body>
                    <Modal.Footer className="border-top py-3">
                        <div className="me-auto fw-bold fs-5">Total: ${calculateTotal()}</div>
                        <Button variant="light" onClick={onHide}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={handleSubmit} disabled={reimbursedTo.length < 4}>
                            ✔ Verify & Submit
                        </Button>
                    </Modal.Footer>
                </div>
            </Modal>

            <CopyFromSpreadsheetModal
                show={showSpreadsheetModal}
                onHide={() => setShowSpreadsheetModal(false)}
            />
        </>
    );
};

export default AddPurchaseModal;
