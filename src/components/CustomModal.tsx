import React from "react";

interface CustomModalProps {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  actions?: React.ReactNode; // Contenu personnalisé pour le footer
  backgroundColor?: string; // Couleur de fond de la modale
  textColor?: string; // Couleur du texte
  className?: string; // Classes CSS supplémentaires
}

const CustomModal: React.FC<CustomModalProps> = ({
  isOpen,
  title,
  onClose,
  children,
  actions,
  backgroundColor = "bg-gray-900", // Valeur par défaut pour le fond
  textColor = "text-gray-200", // Valeur par défaut pour le texte
  className = "rounded-lg", // Valeur par défaut pour les classes supplémentaires
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-gray-800/70 z-50"
      style={{ backdropFilter: "blur(4px)" }}
    >
      <div
        className={`p-6 shadow-lg w-full max-w-md ${backgroundColor} ${textColor} ${className}`}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{title}</h2>
          <button
            className="text-gray-400 hover:text-white"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        {/* Main */}
        <div className="mb-4">{children}</div>

        {/* Footer */}
        {actions && <div className="flex justify-end gap-2">{actions}</div>}
      </div>
    </div>
  );
};

export default CustomModal;
