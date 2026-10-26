const bytes = (value, fallback) => Number(value) > 0 ? Number(value) : fallback;

module.exports = {
    // Largest paste accepted: bounds memory per request and the stored document
    maxPasteBytes: bytes(process.env.BIN_MAX_PASTE_BYTES, 1024 * 1024),
    // Above this, highlighting is skipped: highlightAuto blocks the event loop
    maxHighlightBytes: bytes(process.env.BIN_MAX_HIGHLIGHT_BYTES, 64 * 1024),
};
