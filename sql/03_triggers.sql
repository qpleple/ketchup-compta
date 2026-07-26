-- Database-level integrity rules and audit trail

-- ==============================================
-- Reject amounts above the storage limit
-- ==============================================
CREATE TRIGGER IF NOT EXISTS trg_round_entry_line_insert
BEFORE INSERT ON entry_lines
BEGIN
    SELECT CASE
        WHEN NEW.debit > 999999.99 OR NEW.credit > 999999.99
        THEN RAISE(ABORT, 'Montant trop eleve (max 999999.99)')
    END;
END;

CREATE TRIGGER IF NOT EXISTS trg_round_entry_line_update
BEFORE UPDATE ON entry_lines
BEGIN
    SELECT CASE
        WHEN NEW.debit > 999999.99 OR NEW.credit > 999999.99
        THEN RAISE(ABORT, 'Montant trop eleve (max 999999.99)')
    END;
END;

-- ==============================================
-- Entries are immutable once created
-- ==============================================
CREATE TRIGGER IF NOT EXISTS trg_protect_posted_entries
BEFORE DELETE ON entries
BEGIN
    SELECT RAISE(ABORT, 'Impossible de supprimer une ecriture validee');
END;

-- ==============================================
-- Fall back to the server clock if the application
-- did not provide a creation timestamp
-- ==============================================
CREATE TRIGGER IF NOT EXISTS trg_entry_touch_insert
AFTER INSERT ON entries
BEGIN
    UPDATE entries SET created_at = datetime('now') WHERE id = NEW.id AND created_at IS NULL;
END;

-- ==============================================
-- Keep a trace of deleted accounts
-- ==============================================
CREATE TRIGGER IF NOT EXISTS trg_audit_account_delete
BEFORE DELETE ON accounts
BEGIN
    INSERT INTO audit_log (user_id, action, entity, entity_id, details, created_at)
    VALUES (
        COALESCE((SELECT id FROM users WHERE username = 'system'), 0),
        'DELETE',
        'accounts',
        OLD.id,
        'Code: ' || OLD.code || ', Label: ' || OLD.label,
        datetime('now')
    );
END;
