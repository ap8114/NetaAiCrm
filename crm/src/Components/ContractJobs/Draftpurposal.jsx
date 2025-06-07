import React, { useState } from 'react';


const Draftpurposal = () => {
  const [lineItems, setLineItems] = useState([
    { description: '', qty: 1, rate: 0, taxable: false },
  ]);

  const handleLineItemChange = (index, field, value) => {
    const newItems = [...lineItems];
    newItems[index][field] = value;
    setLineItems(newItems);
  };

  const addLineItem = () => {
    setLineItems([...lineItems, { description: '', qty: 1, rate: 0, taxable: false }]);
  };

  const removeLineItem = (index) => {
    const newItems = lineItems.filter((_, i) => i !== index);
    setLineItems(newItems);
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5><span className="badge bg-primary">Draft</span> Fixed price</h5>
        <div>
          <button className="btn btn-success me-2">Save changes</button>
          <button className="btn btn-outline-secondary">Send out for signature</button>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-3"><label>Attn:</label><input className="form-control" defaultValue="Clark Griswold" /></div>
        <div className="col-md-3"><label>PO #:</label><input className="form-control" placeholder="Enter PO number" /></div>
        <div className="col-md-3"><label>Estimated start date:</label><input type="date" className="form-control" /></div>
        <div className="col-md-3"><label>Estimated end date:</label><input type="date" className="form-control" /></div>
      </div>
      <div className="row mb-4">
        <div className="col-md-3"><label>Contract #:</label><input className="form-control" placeholder="Enter number or id" /></div>
        <div className="col-md-3"><label>Payment terms:</label>
          <select className="form-select">
            <option>NET 45</option>
            <option>NET 30</option>
          </select>
        </div>
      </div>

      <h6 className="bg-light p-2">LINE ITEMS</h6>
      {lineItems.map((item, index) => (
        <div className="bg-info bg-opacity-10 p-3 mb-2 border rounded" key={index}>
          <div className="row align-items-end">
            <div className="col-md-4">
              <input type="text" className="form-control" placeholder="Enter description here"
                value={item.description} onChange={(e) => handleLineItemChange(index, 'description', e.target.value)} />
            </div>
            <div className="col-md-2">
              <input type="number" className="form-control" placeholder="$0.00"
                value={item.rate} onChange={(e) => handleLineItemChange(index, 'rate', parseFloat(e.target.value))} />
            </div>
            <div className="col-md-2">
              <input type="number" className="form-control" value={item.qty} step="1" min="1"
                onChange={(e) => handleLineItemChange(index, 'qty', parseInt(e.target.value))} />
            </div>
            <div className="col-md-1">
              <input type="checkbox" className="form-check-input" checked={item.taxable}
                onChange={(e) => handleLineItemChange(index, 'taxable', e.target.checked)} />
              <label className="form-check-label ms-1">Taxable</label>
            </div>
            <div className="col-md-2">
              <button className="btn btn-outline-danger" onClick={() => removeLineItem(index)}>X</button>
            </div>
          </div>
        </div>
      ))}
      <button className="btn btn-primary mb-4" onClick={addLineItem}>+ Add new line item</button>

      <div className="bg-success bg-opacity-10 p-3 mb-4 border rounded">
        <div className="row">
          <div className="col-md-6">
            <label>Applicable tax rate:</label>
            <select className="form-select">
              <option>(Non taxable) 0%</option>
              <option>5%</option>
              <option>10%</option>
            </select>
          </div>
        </div>
        <div className="mt-3">
          <p>Contract sum: <strong>$0.00</strong></p>
          <p>Taxes in contract sum: <strong>$0.00</strong></p>
        </div>
      </div>

      <h6 className="bg-light p-2">ADDITIONAL OPTIONS</h6>
      <div className="row mb-3">
        <div className="col-md-6">
          <label>Output style:</label>
          <select className="form-select">
            <option>Display line item subtotals</option>
          </select>
        </div>
        <div className="col-md-6">
          <label>Invoicing style:</label>
          <select className="form-select">
            <option>Use a regular invoice - display line items to be invoiced only</option>
          </select>
        </div>
      </div>

      <h6 className="bg-light p-2">TERMS AND CONDITIONS</h6>
      <div className="mb-4">
        <textarea className="form-control" rows="5" placeholder="Enter terms and conditions here..."></textarea>
      </div>
    </div>
  );
};

export default Draftpurposal;
