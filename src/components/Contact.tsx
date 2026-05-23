import React, { useState } from 'react';
import { Mail, Copy, Check, Send, AlertTriangle } from 'lucide-react';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('work@atharv.me');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const validateForm = () => {
    const newErrors: typeof errors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email domain is invalid';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message content cannot be blank';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setIsSuccess(false);
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim(),
        }),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => null);
        setSubmitError(payload?.error || 'Unable to transmit payload. Please try again.');
        return;
      }

      setIsSuccess(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setIsSuccess(false), 5000);
    } catch {
      setSubmitError('Network error. Please try again in a moment.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" style={{ padding: '80px 0', position: 'relative' }}>
      <div className="container" style={{ maxWidth: '900px' }}>
        
        {/* Toast Copied Notification */}
        <div className={`toast-notification ${copied ? 'show' : ''}`}>
          <Check size={16} />
          <span>work@atharv.me copied to clipboard!</span>
        </div>

        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <h3 style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-cyan)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '0.5rem' }}>
            Port Handshake
          </h3>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 800 }}>
            Establish <span className="text-gradient">Connection Link</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '500px', margin: '0.5rem auto 0' }}>
            Initiate a connection for architectural consultations, contracts, and systems building.
          </p>
        </div>

        {/* Contact Container */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '2.5rem', alignItems: 'start' }}>
          
          {/* Left Column: Direct Endpoint & Info */}
          <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', height: '100%', borderRight: '2px solid rgba(255,255,255,0.03)' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, textAlign: 'left' }}>
              Direct Endpoint
            </h3>
            
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', textAlign: 'left', lineHeight: '1.5' }}>
              If you prefer direct SMTP routing over contact templates, copy my primary address below:
            </p>

            {/* Email Copier Widget */}
            <div 
              onClick={handleCopyEmail}
              className="email-copier-widget"
              data-interactive
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                borderRadius: '8px',
                padding: '0.8rem 1rem',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', overflow: 'hidden' }}>
                <Mail size={18} style={{ color: 'var(--accent-cyan)', flexShrink: 0 }} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.88rem', color: '#ffffff', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  work@atharv.me
                </span>
              </div>
              <div style={{ flexShrink: 0 }}>
                {copied ? <Check size={16} style={{ color: 'var(--accent-cyan)' }} /> : <Copy size={16} style={{ color: 'var(--text-muted)' }} />}
              </div>
            </div>



          </div>

          {/* Right Column: Form template */}
          <div className="glass-panel" style={{ padding: '2rem' }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', textAlign: 'left' }}>
              
              {/* Name Field */}
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
                  Handshake Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. John Doe"
                  className="glass-input"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                    if (errors.name) setErrors({ ...errors, name: undefined });
                  }}
                  disabled={isSubmitting}
                  data-interactive
                />
                {errors.name && (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--accent-pink)', fontSize: '0.75rem', marginTop: '0.35rem' }}>
                    <AlertTriangle size={12} />
                    {errors.name}
                  </span>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
                  Return Email Path
                </label>
                <input
                  type="email"
                  placeholder="e.g. john@company.com"
                  className="glass-input"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    if (errors.email) setErrors({ ...errors, email: undefined });
                  }}
                  disabled={isSubmitting}
                  data-interactive
                />
                {errors.email && (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--accent-pink)', fontSize: '0.75rem', marginTop: '0.35rem' }}>
                    <AlertTriangle size={12} />
                    {errors.email}
                  </span>
                )}
              </div>

              {/* Message Field */}
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
                  Packet Message Payload
                </label>
                <textarea
                  rows={4}
                  placeholder="Briefly detail your proposal, contract terms, or system request..."
                  className="glass-input"
                  style={{ resize: 'vertical' }}
                  value={formData.message}
                  onChange={(e) => {
                    setFormData({ ...formData, message: e.target.value });
                    if (errors.message) setErrors({ ...errors, message: undefined });
                  }}
                  disabled={isSubmitting}
                  data-interactive
                />
                {errors.message && (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--accent-pink)', fontSize: '0.75rem', marginTop: '0.35rem' }}>
                    <AlertTriangle size={12} />
                    {errors.message}
                  </span>
                )}
              </div>

              {/* Success Message Banner */}
              {submitError && (
                <div style={{ background: 'rgba(236, 72, 153, 0.08)', border: '1px solid var(--accent-pink)', color: 'var(--accent-pink)', padding: '0.8rem', borderRadius: '8px', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <AlertTriangle size={16} />
                  <span>{submitError}</span>
                </div>
              )}
              {isSuccess && (
                <div style={{ background: 'rgba(0, 242, 254, 0.08)', border: '1px solid var(--accent-cyan)', color: 'var(--accent-cyan)', padding: '0.8rem', borderRadius: '8px', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Check size={16} />
                  <span>Payload transmitted successfully. Handshake complete!</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
                data-interactive
                style={{ width: '100%', justifyContent: 'center', height: '48px', padding: 0 }}
              >
                {isSubmitting ? (
                  <div className="loader-ring" style={{ width: '18px', height: '18px', border: '2px solid rgba(0,0,0,0.1)', borderTopColor: '#03001e', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }}></div>
                ) : (
                  <>
                    <Send size={16} />
                    Transmit Payload
                  </>
                )}
              </button>

            </form>
          </div>

        </div>

      </div>

      <style>{`
        /* Email Copier Hover */
        .email-copier-widget:hover {
          background: rgba(255, 255, 255, 0.05) !important;
          border-color: var(--accent-cyan) !important;
          box-shadow: 0 0 15px rgba(0, 242, 254, 0.1);
        }

        /* Toast popup style */
        .toast-notification {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          background: rgba(8, 6, 16, 0.9);
          border: 1px solid var(--accent-cyan);
          border-radius: 8px;
          padding: 0.8rem 1.2rem;
          color: var(--accent-cyan);
          font-family: var(--font-mono);
          font-size: 0.85rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          box-shadow: 0 10px 30px rgba(0, 242, 254, 0.15);
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          pointer-events: none;
          z-index: 10001;
        }

        .toast-notification.show {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </section>
  );
};
