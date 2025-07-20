import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

interface ItineraryFormData {
  date: Date;
  time: Date;
  notes: string;
}

interface ItineraryFormProps {
  visible: boolean;
  onClose: () => void;
  onSave: (data: ItineraryFormData) => void;
  activityName?: string;
}

const useItineraryForm = () => {
  const [formData, setFormData] = useState<ItineraryFormData>({
    date: new Date(),
    time: new Date(),
    notes: '',
  });
  
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const validateForm = (): boolean => {
    const newErrors: {[key: string]: string} = {};
    
    // Validar que la fecha no sea anterior a hoy
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDate = new Date(formData.date);
    selectedDate.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
      newErrors.date = 'La fecha no puede ser anterior a hoy';
    }
    
    // Validar que si es hoy, la hora no sea anterior a la actual
    if (selectedDate.getTime() === today.getTime()) {
      const now = new Date();
      const selectedDateTime = new Date(formData.date);
      selectedDateTime.setHours(formData.time.getHours(), formData.time.getMinutes());
      
      if (selectedDateTime < now) {
        newErrors.time = 'La hora no puede ser anterior a la actual';
      }
    }
    
    // Validar notas (opcional pero si se ingresa, mínimo 3 caracteres)
    if (formData.notes.trim() && formData.notes.trim().length < 3) {
      newErrors.notes = 'Las notas deben tener al menos 3 caracteres';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
    setFormData({
      date: new Date(),
      time: new Date(),
      notes: '',
    });
    setErrors({});
    setShowDatePicker(false);
    setShowTimePicker(false);
  };

  return {
    formData,
    setFormData,
    showDatePicker,
    setShowDatePicker,
    showTimePicker,
    setShowTimePicker,
    errors,
    validateForm,
    resetForm,
  };
};

const ItineraryForm: React.FC<ItineraryFormProps> = ({
  visible,
  onClose,
  onSave,
  activityName = 'esta actividad',
}) => {
  const {
    formData,
    setFormData,
    showDatePicker,
    setShowDatePicker,
    showTimePicker,
    setShowTimePicker,
    errors,
    validateForm,
    resetForm,
  } = useItineraryForm();

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setFormData(prev => ({ ...prev, date: selectedDate }));
    }
  };

  const handleTimeChange = (event: any, selectedTime?: Date) => {
    setShowTimePicker(Platform.OS === 'ios');
    if (selectedTime) {
      setFormData(prev => ({ ...prev, time: selectedTime }));
    }
  };

  const handleSave = () => {
    if (validateForm()) {
      onSave(formData);
      resetForm();
      onClose();
      Alert.alert('¡Éxito!', 'Actividad guardada en el itinerario');
    }
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (time: Date): string => {
    return time.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={handleClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.title}>Agregar al Itinerario</Text>
              <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>

            {/* Activity Name */}
            <View style={styles.section}>
              <Text style={styles.activityName}>{activityName}</Text>
            </View>

            {/* Date Section */}
            <View style={styles.section}>
              <Text style={styles.label}>Fecha</Text>
              <TouchableOpacity
                style={[styles.input, errors.date && styles.inputError]}
                onPress={() => setShowDatePicker(true)}
              >
                <Text style={styles.inputText}>
                  {formatDate(formData.date)}
                </Text>
              </TouchableOpacity>
              {errors.date && <Text style={styles.errorText}>{errors.date}</Text>}
            </View>

            {/* Time Section */}
            <View style={styles.section}>
              <Text style={styles.label}>Hora</Text>
              <TouchableOpacity
                style={[styles.input, errors.time && styles.inputError]}
                onPress={() => setShowTimePicker(true)}
              >
                <Text style={styles.inputText}>
                  {formatTime(formData.time)}
                </Text>
              </TouchableOpacity>
              {errors.time && <Text style={styles.errorText}>{errors.time}</Text>}
            </View>

            {/* Notes Section */}
            <View style={styles.section}>
              <Text style={styles.label}>Notas adicionales (opcional)</Text>
              <TextInput
                style={[
                  styles.textAreaInput,
                  errors.notes && styles.inputError
                ]}
                multiline
                numberOfLines={4}
                placeholder="Agrega cualquier detalle importante..."
                placeholderTextColor="#999"
                value={formData.notes}
                onChangeText={(text) =>
                  setFormData(prev => ({ ...prev, notes: text }))
                }
                textAlignVertical="top"
              />
              {errors.notes && <Text style={styles.errorText}>{errors.notes}</Text>}
            </View>

            {/* Action Buttons */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={handleClose}
              >
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleSave}
              >
                <Text style={styles.saveButtonText}>Guardar</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>

          {/* Date Picker */}
          {showDatePicker && (
            <DateTimePicker
              value={formData.date}
              mode="date"
              display="default"
              onChange={handleDateChange}
              minimumDate={new Date()}
            />
          )}

          {/* Time Picker */}
          {showTimePicker && (
            <DateTimePicker
              value={formData.time}
              mode="time"
              display="default"
              onChange={handleTimeChange}
            />
          )}
        </View>
      </View>
    </Modal>
  );
};

// Componente principal que muestra cómo usar el formulario
const ItineraryScreen: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState('');

  const handleSaveActivity = (activityName: string) => {
    setSelectedActivity(activityName);
    setShowForm(true);
  };

  const handleFormSave = (data: ItineraryFormData) => {
    console.log('Actividad guardada:', {
      activity: selectedActivity,
      date: data.date,
      time: data.time,
      notes: data.notes,
    });
    // Aquí puedes guardar en tu estado global, AsyncStorage, API, etc.
  };

  return (
    <View style={styles.container}>
      <Text style={styles.screenTitle}>Mi Itinerario</Text>
      
      {/* Ejemplo de botones de actividades */}
      <TouchableOpacity
        style={styles.activityButton}
        onPress={() => handleSaveActivity('Visita al Museo de Historia')}
      >
        <Text style={styles.activityButtonText}>Guardar: Visita al Museo</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.activityButton}
        onPress={() => handleSaveActivity('Caminata por el Parque Central')}
      >
        <Text style={styles.activityButtonText}>Guardar: Caminata</Text>
      </TouchableOpacity>

      <ItineraryForm
        visible={showForm}
        onClose={() => setShowForm(false)}
        onSave={handleFormSave}
        activityName={selectedActivity}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  activityButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  activityButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    width: '90%',
    maxWidth: 400,
    maxHeight: '80%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 18,
    color: '#666',
  },
  activityName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
    textAlign: 'center',
    backgroundColor: '#f8f9ff',
    padding: 12,
    borderRadius: 8,
  },
  section: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 16,
    backgroundColor: '#fff',
  },
  inputError: {
    borderColor: '#ff3b30',
  },
  inputText: {
    fontSize: 16,
    color: '#333',
  },
  textAreaInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 16,
    backgroundColor: '#fff',
    fontSize: 16,
    color: '#333',
    minHeight: 100,
  },
  errorText: {
    color: '#ff3b30',
    fontSize: 14,
    marginTop: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 16,
    borderRadius: 8,
    marginRight: 8,
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#34c759',
    padding: 16,
    borderRadius: 8,
    marginLeft: 8,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default ItineraryScreen;