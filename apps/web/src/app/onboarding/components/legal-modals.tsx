'use client';

import { HiveModal } from '@hive/ui';
import { TERMS_OF_SERVICE, PRIVACY_POLICY } from '../content/legal-content';

interface LegalModalsProps {
  showTermsModal: boolean;
  showPrivacyModal: boolean;
  onCloseTermsModal: () => void;
  onClosePrivacyModal: () => void;
}

export function LegalModals({
  showTermsModal,
  showPrivacyModal,
  onCloseTermsModal,
  onClosePrivacyModal
}: LegalModalsProps) {
  return (
    <>
      {/* Terms of Service Modal */}
      <HiveModal
        isOpen={showTermsModal}
        onClose={onCloseTermsModal}
        title={TERMS_OF_SERVICE.title}
        size="lg"
        className="max-h-[80vh] overflow-y-auto z-[9999]"
      >
        <div className="space-y-4 text-[var(--hive-text-secondary)]">
          <div className="space-y-3">
            {TERMS_OF_SERVICE.sections.map((section, index) => (
              <div key={index}>
                <h3 className="text-lg font-semibold text-[var(--hive-text-primary)]">
                  {section.title}
                </h3>
                <p>{section.content}</p>
              </div>
            ))}
          </div>
        </div>
      </HiveModal>

      {/* Privacy Policy Modal */}
      <HiveModal
        isOpen={showPrivacyModal}
        onClose={onClosePrivacyModal}
        title={PRIVACY_POLICY.title}
        size="lg"
        className="max-h-[80vh] overflow-y-auto z-[9999]"
      >
        <div className="space-y-4 text-[var(--hive-text-secondary)]">
          <div className="space-y-3">
            {PRIVACY_POLICY.sections.map((section, index) => (
              <div key={index}>
                <h3 className="text-lg font-semibold text-[var(--hive-text-primary)]">
                  {section.title}
                </h3>
                <p>{section.content}</p>
              </div>
            ))}
          </div>
        </div>
      </HiveModal>
    </>
  );
}