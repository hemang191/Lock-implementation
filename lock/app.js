const express = require('express');
const fs = require('fs');
const app = express();
const cors = require('cors');
const path = require('path');

// Create an object to track lock status
const lockState = {
    isLocked: false,
    lockHolder: null,
    timestamp: null
};

app.use(cors());
app.use(express.json());

app.post('/lock', async (req, res) => {
    // Check if file is already locked
    if (lockState.isLocked) {
        return res.status(423).json({
            message: 'File is locked by another process',
            lockedSince: lockState.timestamp
        });
    }

    // Acquire lock
    lockState.isLocked = true;
    lockState.lockHolder = req.ip;
    lockState.timestamp = new Date();

    res.status(200).json({
        message: 'Lock acquired successfully',
        lockId: lockState.timestamp
    });
});

app.post('/write', async (req, res) => {
    const { content } = req.body;
    const filePath = path.join('./../write.txt');
    // Check if the requester has the lock
    if (!lockState.isLocked || lockState.lockHolder !== req.ip) {
        return res.status(403).json({
            message: 'You must acquire the lock before writing'
        });
    }

    try {
        // Write to file
        
        fs.appendFileSync(filePath, content + lockState.lockHolder +  '\n');
        res.status(200).json({
            message: 'File written successfully'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error writing to file',
            error: error.message
        });
    }
});

app.post('/release', (req, res) => {
    // Only the lock holder can release the lock
    if (lockState.lockHolder !== req.ip) {
        return res.status(403).json({
            message: 'You do not hold the lock'
        });
    }

    // Release lock
    lockState.isLocked = false;
    lockState.lockHolder = null;
    lockState.timestamp = null;

    res.status(200).json({
        message: 'Lock released successfully'
    });
});

app.listen(3009, () => {
    console.log('lock on port : 3009');
});
