import { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const ItinerarioForm = ({ actividad }) => {
  const [date, setDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [duration, setDuration] = useState(60); // minutos
  const [notes, setNotes] = useState('');

  const handleSchedule = () => {
    const actividadProgramada = {
      ...actividad,
      scheduledDate: date,
      startTime,
      duration,
      notes
    };
    console.log('Actividad programada:', actividadProgramada);
    // Lógica para guardar
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 18, marginBottom: 10 }}>Programar: {actividad.nombre}</Text>
      
      <Text>Fecha:</Text>
      <DateTimePicker
        value={date}
        mode="date"
        display="default"
        onChange={(_, selectedDate) => setDate(selectedDate || date)}
      />
      
      <Text style={{ marginTop: 15 }}>Hora de inicio:</Text>
      <DateTimePicker
        value={startTime}
        mode="time"
        display="spinner"
        onChange={(_, selectedTime) => setStartTime(selectedTime || startTime)}
      />
      
      <Text style={{ marginTop: 15 }}>Duración (minutos):</Text>
      <TextInput
        keyboardType="numeric"
        value={duration.toString()}
        onChangeText={(text) => setDuration(Number(text) || 60)}
      />
      
      <Text style={{ marginTop: 15 }}>Notas:</Text>
      <TextInput
        multiline
        numberOfLines={3}
        value={notes}
        onChangeText={setNotes}
      />
      
      <Button 
        title="Programar actividad" 
        onPress={handleSchedule} 
        style={{ marginTop: 20 }}
      />
    </View>
  );
};