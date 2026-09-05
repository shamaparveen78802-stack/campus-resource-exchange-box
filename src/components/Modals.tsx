import React, { useState } from 'react';
import { useCampus } from '../context/CampusContext';
import {
  ResourceItem,
  SkillSwapItem,
  CategoryType,
  ItemCondition,
  ExchangeType,
  UrgencyLevel
} from '../types';
import {
  X,
  Sparkles,
  ShieldCheck,
  MapPin,
  Clock,
  Tag,
  Star,
  Check,
  Send,
  Heart,
  Gift,
  PlusCircle,
  HelpCircle,
  ArrowRight
} from 'lucide-react';

/* -------------------------------------------------------------
   1. Resource Details Modal
------------------------------------------------------------- */
interface ResourceDetailModalProps {
  item: ResourceItem | null;
  onClose: () => void;
  onRequest: (item: ResourceItem) => void;
}

export const ResourceDetailModal: React.FC<ResourceDetailModalProps> = ({
  item,
  onClose,
  onRequest
}) => {
  const { currentUser } = useCampus();

  if (!item) return null;

  const isOwnItem = item.ownerId === currentUser?.id;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
      <div className="bg-white w-full max-w-lg rounded-xl shadow-2xl border border-slate-200/90 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-100 flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-2xl">
              {item.imageEmoji || '📦'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200 text-slate-700 uppercase tracking-wide">
                  {item.category}
                </span>
                <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-md border ${
                  item.exchangeType === 'Free'
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                    : item.exchangeType === 'Exchange'
                    ? 'bg-indigo-50 text-indigo-800 border-indigo-200'
                    : 'bg-amber-50 text-amber-800 border-amber-200'
                }`}>
                  {item.exchangeType}
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-900 mt-1">{item.title}</h3>
            </div>
          </div>
          <button
            id="close-detail-modal"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-5 space-y-4 max-h-[70vh] overflow-y-auto">
          {/* Key Quick Facts */}
          <div className="grid grid-cols-2 gap-3 p-3.5 bg-slate-50/70 border border-slate-200/80 rounded-lg text-xs">
            <div>
              <span className="text-slate-400 block font-medium">Condition</span>
              <span className="text-slate-800 font-semibold">{item.condition}</span>
            </div>
            <div>
              <span className="text-slate-400 block font-medium">Estimated Value</span>
              <span className="text-emerald-700 font-semibold">₹{item.estimatedValue}</span>
            </div>
            <div>
              <span className="text-slate-400 block font-medium">Location</span>
              <span className="text-slate-800 font-medium flex items-center gap-1 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-indigo-500" />
                {item.location}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block font-medium">Availability</span>
              <span className="text-slate-800 font-medium flex items-center gap-1 mt-0.5">
                <Clock className="w-3.5 h-3.5 text-indigo-500" />
                {item.availability}
              </span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              Description & Details
            </h4>
            <p className="text-sm text-slate-700 leading-relaxed bg-white p-3 rounded-lg border border-slate-200/80">
              {item.description}
            </p>
          </div>

          {/* Tags */}
          {item.tags.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5 flex items-center gap-1">
                <Tag className="w-3 h-3 text-slate-400" />
                Related Topics & Semesters
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {item.tags.map((t, idx) => (
                  <span
                    key={idx}
                    className="text-xs bg-slate-100 border border-slate-200 text-slate-600 px-2 py-0.5 rounded-md"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Owner Profile Card */}
          <div className="p-3.5 bg-slate-50/80 rounded-lg border border-slate-200/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={item.ownerAvatar}
                alt={item.ownerName}
                className="w-10 h-10 rounded-full object-cover ring-1 ring-slate-200 shadow-xs"
              />
              <div>
                <div className="text-sm font-semibold text-slate-900 flex items-center gap-1">
                  {item.ownerName}
                  {item.ownerVerified && (
                    <ShieldCheck className="w-4 h-4 text-emerald-600" title="Verified Campus Student" />
                  )}
                </div>
                <div className="text-xs text-slate-500 flex items-center gap-1.5">
                  <span className="flex items-center text-amber-600 font-semibold">
                    <Star className="w-3 h-3 fill-amber-400 inline mr-0.5" />
                    {item.ownerReputation}
                  </span>
                  <span>·</span>
                  <span>Listed {item.createdAt}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-2">
          <button
            id="modal-cancel-btn"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-200/60 rounded-lg transition"
          >
            Close
          </button>
          {!isOwnItem ? (
            <button
              id="modal-request-item-btn"
              disabled={item.status !== 'available'}
              onClick={() => {
                onRequest(item);
                onClose();
              }}
              className={`px-5 py-2 text-sm font-semibold text-white rounded-lg shadow-xs transition flex items-center gap-1.5 border ${
                item.status === 'available'
                  ? 'bg-indigo-600 hover:bg-indigo-700 border-indigo-700/30'
                  : 'bg-slate-400 border-slate-400 cursor-not-allowed'
              }`}
            >
              <Send className="w-4 h-4" />
              {item.status === 'available' ? 'Request Item' : 'Already Requested'}
            </button>
          ) : (
            <span className="text-xs text-slate-500 italic pr-2">This is your listing</span>
          )}
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------
   2. List Resource Modal
------------------------------------------------------------- */
interface ListResourceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ListResourceModal: React.FC<ListResourceModalProps> = ({
  isOpen,
  onClose
}) => {
  const { addResource, currentUser } = useCampus();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<CategoryType>('books');
  const [condition, setCondition] = useState<ItemCondition>('Good');
  const [exchangeType, setExchangeType] = useState<ExchangeType>('Exchange');
  const [estimatedValue, setEstimatedValue] = useState('450');
  const [location, setLocation] = useState(currentUser?.hostel || 'Hostel Block C');
  const [availability, setAvailability] = useState('Flexible weekdays after classes');
  const [description, setDescription] = useState('');
  const [tagsInput, setTagsInput] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const emojiMap: Record<CategoryType, string> = {
      books: '📚',
      electronics: '💻',
      stationery: '✏️',
      hostel: '🛏️',
      other: '🎒'
    };

    const tags = tagsInput
      .split(',')
      .map(t => t.trim().toLowerCase())
      .filter(Boolean);

    addResource({
      title: title.trim(),
      category,
      condition,
      exchangeType,
      estimatedValue: Number(estimatedValue) || 200,
      location: location.trim() || 'Central Library',
      description: description.trim() || 'Available for campus exchange or handover.',
      tags: tags.length > 0 ? tags : [category, 'campus'],
      availability: availability.trim() || 'Flexible',
      imageEmoji: emojiMap[category]
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
      <div className="bg-white w-full max-w-lg rounded-xl shadow-2xl border border-slate-200/90 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
              <PlusCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">List a Campus Resource</h3>
              <p className="text-xs text-slate-500">Share textbooks, gadgets, and hostel essentials</p>
            </div>
          </div>
          <button
            id="close-list-modal"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4 max-h-[75vh] overflow-y-auto text-sm">
          {/* Item Name */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Resource Name *
            </label>
            <input
              id="list-resource-title"
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Higher Engineering Mathematics or Casio fx-991EX"
              className="w-full px-3.5 py-2 rounded-lg border border-slate-200 focus:border-indigo-500 focus:ring-0 outline-none text-slate-800 bg-white"
            />
          </div>

          {/* Category & Condition */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
              <select
                id="list-resource-category"
                value={category}
                onChange={(e) => setCategory(e.target.value as CategoryType)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-indigo-500 focus:ring-0 outline-none text-slate-800 bg-white"
              >
                <option value="books">📚 Books</option>
                <option value="electronics">💻 Electronics</option>
                <option value="stationery">✏️ Stationery</option>
                <option value="hostel">🛏️ Hostel Items</option>
                <option value="other">🎒 Other</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Condition</label>
              <select
                id="list-resource-condition"
                value={condition}
                onChange={(e) => setCondition(e.target.value as ItemCondition)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-indigo-500 focus:ring-0 outline-none text-slate-800 bg-white"
              >
                <option value="Like New">Like New (Mint)</option>
                <option value="Good">Good (Minor wear)</option>
                <option value="Fair">Fair (Readable/Usable)</option>
                <option value="Heavily Used">Heavily Used</option>
              </select>
            </div>
          </div>

          {/* Exchange Type & Value */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Exchange Type</label>
              <select
                id="list-resource-type"
                value={exchangeType}
                onChange={(e) => setExchangeType(e.target.value as ExchangeType)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-indigo-500 focus:ring-0 outline-none text-slate-800 bg-white"
              >
                <option value="Exchange">🔄 Swap / Exchange</option>
                <option value="Free">🎁 Free / Pay-it-forward</option>
                <option value="Sell">💰 Nominal Price</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Estimated Value (₹)
              </label>
              <input
                id="list-resource-value"
                type="number"
                value={estimatedValue}
                onChange={(e) => setEstimatedValue(e.target.value)}
                placeholder="450"
                className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-indigo-500 focus:ring-0 outline-none text-slate-800 bg-white"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Description & Edition/Specs
            </label>
            <textarea
              id="list-resource-desc"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="State edition, inclusion of cables/accessories, or specific subject..."
              className="w-full px-3.5 py-2 rounded-lg border border-slate-200 focus:border-indigo-500 focus:ring-0 outline-none text-slate-800 resize-none bg-white"
            ></textarea>
          </div>

          {/* Location & Availability */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Handover Location
              </label>
              <input
                id="list-resource-location"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Hostel Block C, Library Lounge"
                className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-indigo-500 focus:ring-0 outline-none text-slate-800 bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Availability
              </label>
              <input
                id="list-resource-availability"
                type="text"
                value={availability}
                onChange={(e) => setAvailability(e.target.value)}
                placeholder="e.g. Weekdays after 5 PM"
                className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-indigo-500 focus:ring-0 outline-none text-slate-800 bg-white"
              />
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Tags / Keywords (comma-separated)
            </label>
            <input
              id="list-resource-tags"
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="e.g. calculus, maths, sem 2, grewal"
              className="w-full px-3.5 py-2 rounded-lg border border-slate-200 focus:border-indigo-500 focus:ring-0 outline-none text-slate-800 text-xs bg-white"
            />
          </div>

          <div className="p-4 bg-slate-50 border-t border-slate-100 -mx-5 -mb-5 mt-4 flex items-center justify-end gap-2">
            <button
              type="button"
              id="cancel-list-btn"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-200/60 rounded-lg transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              id="submit-list-btn"
              className="px-5 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 border border-indigo-700/30 rounded-lg shadow-xs transition"
            >
              List Resource
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------
   3. Post Need / Wishlist Modal
------------------------------------------------------------- */
interface PostWishModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PostWishModal: React.FC<PostWishModalProps> = ({
  isOpen,
  onClose
}) => {
  const { addWishlist, currentUser } = useCampus();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<CategoryType>('books');
  const [description, setDescription] = useState('');
  const [urgency, setUrgency] = useState<UrgencyLevel>('Normal');
  const [preferredLocation, setPreferredLocation] = useState(currentUser.hostel);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    addWishlist({
      title: title.trim(),
      category,
      description: description.trim() || 'Looking for this item on campus.',
      urgency,
      preferredLocation: preferredLocation.trim() || 'Central Campus'
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
      <div className="bg-white w-full max-w-lg rounded-xl shadow-2xl border border-slate-200/90 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-rose-50 border border-rose-100 text-rose-600 flex items-center justify-center font-bold">
              <Heart className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Post a Need (Wishlist)</h3>
              <p className="text-xs text-slate-500">“What do you need, and how can your campus fulfill it?”</p>
            </div>
          </div>
          <button
            id="close-wish-modal"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4 max-h-[75vh] overflow-y-auto text-sm">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              What do you need? *
            </label>
            <input
              id="wish-title"
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Engineering Physics textbook, USB-C charger, or SQL tutor"
              className="w-full px-3.5 py-2 rounded-lg border border-slate-200 focus:border-rose-500 focus:ring-0 outline-none text-slate-800 bg-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
              <select
                id="wish-category"
                value={category}
                onChange={(e) => setCategory(e.target.value as CategoryType)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-rose-500 focus:ring-0 outline-none text-slate-800 bg-white"
              >
                <option value="books">📚 Books</option>
                <option value="electronics">💻 Electronics</option>
                <option value="stationery">✏️ Stationery</option>
                <option value="hostel">🛏️ Hostel Items</option>
                <option value="other">🎒 Other / Skills</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Urgency</label>
              <select
                id="wish-urgency"
                value={urgency}
                onChange={(e) => setUrgency(e.target.value as UrgencyLevel)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-rose-500 focus:ring-0 outline-none text-slate-800 bg-white"
              >
                <option value="Normal">🟢 Normal (within a week)</option>
                <option value="Urgent">🟠 Urgent (in 1-2 days)</option>
                <option value="Exam Tomorrow!">🔴 Exam Tomorrow!</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Description & Context
            </label>
            <textarea
              id="wish-desc"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide subject code, model requirement, or exam deadline..."
              className="w-full px-3.5 py-2 rounded-lg border border-slate-200 focus:border-rose-500 focus:ring-0 outline-none text-slate-800 resize-none bg-white"
            ></textarea>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Preferred Handover Location
            </label>
            <input
              id="wish-location"
              type="text"
              value={preferredLocation}
              onChange={(e) => setPreferredLocation(e.target.value)}
              placeholder="e.g. Central Library, Hostel Block A/C"
              className="w-full px-3.5 py-2 rounded-lg border border-slate-200 focus:border-rose-500 focus:ring-0 outline-none text-slate-800 bg-white"
            />
          </div>

          <div className="p-4 bg-slate-50 border-t border-slate-100 -mx-5 -mb-5 mt-4 flex items-center justify-end gap-2">
            <button
              type="button"
              id="cancel-wish-btn"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-200/60 rounded-lg transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              id="submit-wish-btn"
              className="px-5 py-2 text-sm font-semibold text-white bg-rose-600 hover:bg-rose-700 border border-rose-700/30 rounded-lg shadow-xs transition"
            >
              Post to Wishlist
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------
   4. Offer Skill Modal (SkillSwap)
------------------------------------------------------------- */
interface OfferSkillModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OfferSkillModal: React.FC<OfferSkillModalProps> = ({
  isOpen,
  onClose
}) => {
  const { addSkillSwap } = useCampus();

  const [skillOffered, setSkillOffered] = useState('');
  const [category, setCategory] = useState<SkillSwapItem['skillOfferedCategory']>('Coding');
  const [level, setLevel] = useState<SkillSwapItem['skillOfferedLevel']>('Intermediate');
  const [skillWanted, setSkillWanted] = useState('');
  const [availability, setAvailability] = useState('Weekends & Evenings after 5 PM');
  const [format, setFormat] = useState<SkillSwapItem['format']>('1-on-1 In-person');
  const [description, setDescription] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!skillOffered.trim() || !skillWanted.trim()) return;

    addSkillSwap({
      skillOffered: skillOffered.trim(),
      skillOfferedCategory: category,
      skillOfferedLevel: level,
      skillWanted: skillWanted.trim(),
      availability,
      format,
      description: description.trim() || 'Happy to guide peers and learn mutually.'
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
      <div className="bg-white w-full max-w-lg rounded-xl shadow-2xl border border-slate-200/90 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Offer a Skill on SkillSwap</h3>
              <p className="text-xs text-slate-500">Peer-to-peer knowledge exchange with zero money involved</p>
            </div>
          </div>
          <button
            id="close-skill-modal"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4 max-h-[75vh] overflow-y-auto text-sm">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              What skill can you teach or share? *
            </label>
            <input
              id="skill-offered-input"
              type="text"
              required
              value={skillOffered}
              onChange={(e) => setSkillOffered(e.target.value)}
              placeholder="e.g. Python for Data Science, Calculus I, or Figma UI"
              className="w-full px-3.5 py-2 rounded-lg border border-slate-200 focus:border-indigo-500 focus:ring-0 outline-none text-slate-800 bg-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
              <select
                id="skill-category-select"
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-indigo-500 focus:ring-0 outline-none text-slate-800 bg-white"
              >
                <option value="Coding">💻 Coding</option>
                <option value="Math & Science">🔬 Math & Science</option>
                <option value="Design">🎨 Design</option>
                <option value="Languages">🗣️ Languages</option>
                <option value="Academics">📚 Academics</option>
                <option value="Exam Prep">🎯 Exam Prep</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Your Proficiency</label>
              <select
                id="skill-level-select"
                value={level}
                onChange={(e) => setLevel(e.target.value as any)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-indigo-500 focus:ring-0 outline-none text-slate-800 bg-white"
              >
                <option value="Beginner">Beginner (Basics)</option>
                <option value="Intermediate">Intermediate (Coursework/Projects)</option>
                <option value="Expert">Expert (Advanced / Teaching exp)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              What skill would you like in return? *
            </label>
            <input
              id="skill-wanted-input"
              type="text"
              required
              value={skillWanted}
              onChange={(e) => setSkillWanted(e.target.value)}
              placeholder="e.g. Excel Financial Modeling, French, or Guitar basics"
              className="w-full px-3.5 py-2 rounded-lg border border-slate-200 focus:border-indigo-500 focus:ring-0 outline-none text-slate-800 bg-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Availability</label>
              <input
                id="skill-avail-input"
                type="text"
                value={availability}
                onChange={(e) => setAvailability(e.target.value)}
                placeholder="e.g. Weekends, Fri evenings"
                className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-indigo-500 focus:ring-0 outline-none text-slate-800 bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Format</label>
              <select
                id="skill-format-select"
                value={format}
                onChange={(e) => setFormat(e.target.value as any)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-indigo-500 focus:ring-0 outline-none text-slate-800 bg-white"
              >
                <option value="1-on-1 In-person">1-on-1 In-person</option>
                <option value="Online/Discord">Online / Discord</option>
                <option value="Flexible">Flexible</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Session Overview / What you will cover
            </label>
            <textarea
              id="skill-overview-input"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Explain what topics or problem sheets you can solve together..."
              className="w-full px-3.5 py-2 rounded-lg border border-slate-200 focus:border-indigo-500 focus:ring-0 outline-none text-slate-800 resize-none bg-white"
            ></textarea>
          </div>

          <div className="p-4 bg-slate-50 border-t border-slate-100 -mx-5 -mb-5 mt-4 flex items-center justify-end gap-2">
            <button
              type="button"
              id="cancel-skill-btn"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-200/60 rounded-lg transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              id="submit-skill-btn"
              className="px-5 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 border border-indigo-700/30 rounded-lg shadow-xs transition"
            >
              Publish Skill Offer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------
   5. Propose Skill Swap Modal
------------------------------------------------------------- */
interface ProposeSwapModalProps {
  targetSkill: SkillSwapItem | null;
  onClose: () => void;
}

export const ProposeSwapModal: React.FC<ProposeSwapModalProps> = ({
  targetSkill,
  onClose
}) => {
  const { requestSkillSwap } = useCampus();
  const [offeredSkill, setOfferedSkill] = useState('Advanced Excel & Financial Modeling');

  if (!targetSkill) return null;

  const handleConfirm = () => {
    requestSkillSwap(targetSkill.id, offeredSkill);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
      <div className="bg-white w-full max-w-md rounded-xl shadow-2xl border border-slate-200/90 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900">Propose Skill Swap</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-4 text-sm">
          <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-lg flex items-center gap-3">
            <img
              src={targetSkill.studentAvatar}
              alt={targetSkill.studentName}
              className="w-10 h-10 rounded-full object-cover ring-1 ring-slate-200"
            />
            <div>
              <div className="text-[11px] text-indigo-700 font-semibold uppercase tracking-wider">
                You receive:
              </div>
              <div className="font-bold text-slate-900">{targetSkill.skillOffered}</div>
              <div className="text-xs text-slate-500">From {targetSkill.studentName}</div>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="w-7 h-7 rounded-md bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500 text-xs font-bold">
              ⇅
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Select what you will teach in exchange:
            </label>
            <select
              id="propose-skill-choice"
              value={offeredSkill}
              onChange={(e) => setOfferedSkill(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-indigo-500 focus:ring-0 outline-none text-slate-800 bg-white"
            >
              <option value="Advanced Excel & Financial Modeling">
                📊 Advanced Excel & Financial Modeling
              </option>
              <option value="Systems Programming & C++">
                💻 Systems Programming & C++
              </option>
              <option value="Python Scripting Basics">
                🐍 Python Scripting Basics
              </option>
              <option value="Competitive Exam Quant Formulas">
                📐 Competitive Exam Quant Formulas
              </option>
            </select>
          </div>

          <p className="text-xs text-slate-500 leading-relaxed">
            {targetSkill.studentName} will receive a notification to review and schedule a mutual 1-on-1 session ({targetSkill.format}).
          </p>
        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-200/60 rounded-lg transition"
          >
            Cancel
          </button>
          <button
            id="confirm-swap-btn"
            onClick={handleConfirm}
            className="px-5 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 border border-indigo-700/30 rounded-lg shadow-xs transition"
          >
            Send Proposal
          </button>
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------
   6. Donate Item Modal
------------------------------------------------------------- */
interface DonateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DonateModal: React.FC<DonateModalProps> = ({ isOpen, onClose }) => {
  const { addDonation } = useCampus();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<CategoryType | 'clothes'>('books');
  const [condition, setCondition] = useState<ItemCondition>('Good');
  const [dropoffSpot, setDropoffSpot] = useState('Central Library Ground Floor Drop-Box');
  const [impactStory, setImpactStory] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const emojiMap: Record<string, string> = {
      books: '📚',
      clothes: '👕',
      stationery: '✏️',
      hostel: '🛏️',
      electronics: '🧮',
      other: '🎁'
    };

    addDonation({
      title: title.trim(),
      category,
      condition,
      dropoffSpot,
      impactStory: impactStory.trim() || 'Donated to support fellow campus peers and prevent landfill waste.',
      imageEmoji: emojiMap[category] || '🎁'
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
      <div className="bg-white w-full max-w-lg rounded-xl shadow-2xl border border-slate-200/90 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
              <Gift className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Give What You Don't Need</h3>
              <p className="text-xs text-slate-500">Pass on items to freshers & students in need</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4 max-h-[75vh] overflow-y-auto text-sm">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Item to Donate *
            </label>
            <input
              id="donate-title-input"
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Casio fx-82MS, Chemistry Kit, Winter Quilt, Drafter"
              className="w-full px-3.5 py-2 rounded-lg border border-slate-200 focus:border-emerald-500 focus:ring-0 outline-none text-slate-800 bg-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
              <select
                id="donate-category-select"
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-emerald-500 focus:ring-0 outline-none text-slate-800 bg-white"
              >
                <option value="books">📚 Books</option>
                <option value="clothes">👕 Clothes & Winterwear</option>
                <option value="stationery">✏️ Stationery</option>
                <option value="hostel">🛏️ Hostel Items</option>
                <option value="electronics">💻 Electronics</option>
                <option value="other">🎒 Other useful items</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Condition</label>
              <select
                id="donate-condition-select"
                value={condition}
                onChange={(e) => setCondition(e.target.value as ItemCondition)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-emerald-500 focus:ring-0 outline-none text-slate-800 bg-white"
              >
                <option value="Like New">Like New</option>
                <option value="Good">Good Condition</option>
                <option value="Fair">Fair / Completely Usable</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Designated Campus Drop-off Spot
            </label>
            <select
              id="donate-dropoff-select"
              value={dropoffSpot}
              onChange={(e) => setDropoffSpot(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-emerald-500 focus:ring-0 outline-none text-slate-800 bg-white"
            >
              <option value="Central Library Ground Floor Drop-Box">
                Central Library Ground Floor Drop-Box
              </option>
              <option value="Student Welfare Center, Room 12">
                Student Welfare Center, Room 12
              </option>
              <option value="Hostel Block D Warden Office">
                Hostel Block D Warden Office
              </option>
              <option value="Green Campus Sustainability Kiosk">
                Green Campus Sustainability Kiosk
              </option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Encouraging Note or Story for the Recipient
            </label>
            <textarea
              id="donate-story-input"
              rows={3}
              value={impactStory}
              onChange={(e) => setImpactStory(e.target.value)}
              placeholder="e.g. 'Helped me ace Thermodynamics in semester 2. Wishing you all the best for exams!'"
              className="w-full px-3.5 py-2 rounded-lg border border-slate-200 focus:border-emerald-500 focus:ring-0 outline-none text-slate-800 resize-none bg-white"
            ></textarea>
          </div>

          <div className="p-4 bg-slate-50 border-t border-slate-100 -mx-5 -mb-5 mt-4 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-200/60 rounded-lg transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              id="submit-donation-btn"
              className="px-5 py-2 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 border border-emerald-700/30 rounded-lg shadow-xs transition"
            >
              Confirm Donation
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------
   7. Review / Rating Modal
------------------------------------------------------------- */
interface ReviewModalProps {
  isOpen: boolean;
  toStudentName: string;
  toStudentId: string;
  itemTitle: string;
  onClose: () => void;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({
  isOpen,
  toStudentName,
  toStudentId,
  itemTitle,
  onClose
}) => {
  const { addReview } = useCampus();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addReview({
      toStudentId,
      rating,
      comment: comment.trim() || 'Smooth and prompt exchange. Great campus peer!',
      itemTitle: itemTitle || 'Campus Exchange'
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
      <div className="bg-white w-full max-w-md rounded-xl shadow-2xl border border-slate-200/90 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900">Rate Exchange with {toStudentName}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4 text-sm">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">
              Rating
            </label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  className="p-1 text-2xl focus:outline-none transition hover:scale-110"
                >
                  <Star
                    className={`w-7 h-7 ${
                      star <= rating
                        ? 'text-amber-400 fill-amber-400'
                        : 'text-slate-300'
                    }`}
                  />
                </button>
              ))}
              <span className="text-sm font-bold text-slate-700 ml-2">
                {rating}.0 / 5.0
              </span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Feedback & Experience
            </label>
            <textarea
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="e.g. Arrived on time at the library, book was in great condition!"
              className="w-full px-3.5 py-2 rounded-lg border border-slate-200 focus:border-indigo-500 focus:ring-0 outline-none text-slate-800 resize-none bg-white"
            ></textarea>
          </div>

          <div className="p-4 bg-slate-50 border-t border-slate-100 -mx-5 -mb-5 mt-4 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 rounded-lg transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 border border-indigo-700/30 rounded-lg shadow-xs transition"
            >
              Submit Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
