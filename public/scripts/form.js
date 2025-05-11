document.addEventListener('DOMContentLoaded', function() {
    const addItemBtn = document.getElementById('addItem');
    const itemsContainer = document.getElementById('itemsContainer');
    
    // Initialize select2 on existing selects
    document.querySelectorAll('.item-name').forEach(select => {
        initializeSelect2(select);
    });
    
    addItemBtn.addEventListener('click', function() {
        const newItemRow = document.createElement('div');
        newItemRow.className = 'item-row';
        
        newItemRow.innerHTML = `
            <div class="form-group">
                <select name="itemName" class="item-name" required>
                    <option value="">Select Item</option>
                    <option value="RING">RING</option>
                    <option value="EARRING">EARRING</option>
                    <option value="PENDANT">PENDANT</option>
                    <option value="BANGLE">BANGLE</option>
                    <option value="SANKHA">SANKHA</option>
                    <option value="BRACELET">BRACELET</option>
                    <option value="NECKLACE">NECKLACE</option>
                    <option value="CHOKER NECKLACE">CHOKER NECKLACE</option>
                    <option value="CHAIN">CHAIN</option>
                    <option value="NOSE RING">NOSE RING</option>
                    <option value="MAANG TIKKA">MAANG TIKKA</option>
                    <option value="GOLD COIN / BISCUIT">GOLD COIN / BISCUIT</option>
                </select>
            </div>
            <div class="form-group">
                <select name="purity" required>
                    <option value="BIS916">BIS916</option>
                    <option value="22CT">22CT</option>
                    <option value="18CT">18CT</option>
                    <option value="999GO">999GO</option>
                </select>
            </div>
            <div class="form-group">
                <input type="number" name="quantity" min="1" step="1" value="1" required>
            </div>
            <div class="form-group">
                <input type="number" name="weight" min="0.001" step="0.001" required>
            </div>
            <div class="form-group">
                <input type="number" name="rate" min="0" step="0.01" required>
            </div>
            <div class="form-group">
                <input type="number" name="makingChargePerGram" min="0" step="0.01" required>
            </div>
            <button type="button" class="remove-item" onclick="removeItem(this)">×</button>
        `;
        
        itemsContainer.appendChild(newItemRow);
        // Initialize select2 on the new select element
        initializeSelect2(newItemRow.querySelector('.item-name'));
    });
});

function initializeSelect2(selectElement) {
    $(selectElement).select2({
        placeholder: "Select or type to search",
        allowClear: true,
        width: '100%'
    });
}

function removeItem(button) {
    const itemRow = button.closest('.item-row');
    if (document.querySelectorAll('.item-row').length > 1) {
        itemRow.remove();
    } else {
        alert('You need at least one item');
    }
}